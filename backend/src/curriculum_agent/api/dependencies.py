"""
API Dependencies — provides shared dependencies for API routes.
"""

import json
import os
from pathlib import Path
from typing import Optional

import jwt
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from src.curriculum_agent.config import config
from src.curriculum_agent.deepseek_client import DeepSeekClient
from src.curriculum_agent.pal.compiler import PALCompiler
from src.curriculum_agent.research.engine import ResearchEngine
from src.curriculum_agent.index.master_index import MasterIndexBuilder
from src.curriculum_agent.curriculum.generator import CurriculumGenerator
from src.curriculum_agent.ragdal.pipeline import RAGDALPipeline
from src.curriculum_agent.ragdal.knowledge_base import KnowledgeBase
from src.curriculum_agent.npao.orchestrator import NPAOOrchestrator


_client: Optional[DeepSeekClient] = None
_bearer_scheme = HTTPBearer(auto_error=False)


def get_deepseek_client() -> DeepSeekClient:
    global _client
    if _client is None:
        _client = DeepSeekClient()
    return _client


def get_pal_compiler() -> PALCompiler:
    return PALCompiler(get_deepseek_client())


def get_research_engine() -> ResearchEngine:
    return ResearchEngine(get_deepseek_client())


def get_index_builder() -> MasterIndexBuilder:
    return MasterIndexBuilder(get_deepseek_client())


def get_curriculum_generator() -> CurriculumGenerator:
    return CurriculumGenerator(get_deepseek_client())


def get_ragdal_pipeline() -> RAGDALPipeline:
    return RAGDALPipeline(get_deepseek_client())


def get_knowledge_base() -> KnowledgeBase:
    return KnowledgeBase()


def get_orchestrator() -> NPAOOrchestrator:
    return NPAOOrchestrator()


def _load_users() -> list[dict]:
    """Load users from JSON file, returning empty list on any failure."""
    users_path = config.DATA_DIR / "users.json"
    try:
        if users_path.exists():
            return json.loads(users_path.read_text())
    except (json.JSONDecodeError, OSError):
        pass
    return []


def _save_users(users: list[dict]) -> None:
    """Save users list to JSON file atomically."""
    users_path = config.DATA_DIR / "users.json"
    users_path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = users_path.with_suffix(".tmp")
    tmp_path.write_text(json.dumps(users, indent=2))
    os.replace(tmp_path, users_path)


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer_scheme),
) -> dict:
    """Extract and validate JWT from Authorization header. Returns user dict."""
    if credentials is None:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    token = credentials.credentials
    try:
        payload = jwt.decode(token, config.JWT_SECRET, algorithms=[config.JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    users = _load_users()
    for u in users:
        if u["id"] == user_id:
            return u

    raise HTTPException(status_code=401, detail="User not found")
