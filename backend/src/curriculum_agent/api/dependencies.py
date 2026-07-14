"""
API Dependencies — provides shared dependencies for API routes.
"""

from typing import Optional
from src.curriculum_agent.deepseek_client import DeepSeekClient
from src.curriculum_agent.pal.compiler import PALCompiler
from src.curriculum_agent.research.engine import ResearchEngine
from src.curriculum_agent.index.master_index import MasterIndexBuilder
from src.curriculum_agent.curriculum.generator import CurriculumGenerator
from src.curriculum_agent.ragdal.pipeline import RAGDALPipeline
from src.curriculum_agent.ragdal.knowledge_base import KnowledgeBase
from src.curriculum_agent.npao.orchestrator import NPAOOrchestrator


_client: Optional[DeepSeekClient] = None


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
