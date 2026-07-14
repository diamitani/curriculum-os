import os
from pathlib import Path
from typing import Optional


class Config:
    BASE_DIR = Path(__file__).parent.parent.parent

    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "")
    DEEPSEEK_MODEL: str = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")
    DEEPSEEK_BASE_URL: str = os.getenv(
        "DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1"
    )

    RAGDAL_CONFIDENCE_THRESHOLD: float = float(
        os.getenv("RAGDAL_CONFIDENCE_THRESHOLD", "0.8")
    )
    RAGDAL_MAX_PASSES: int = int(os.getenv("RAGDAL_MAX_PASSES", "3"))
    RAGDAL_CACHE_TTL_HOURS: int = int(os.getenv("RAGDAL_CACHE_TTL_HOURS", "72"))

    KNOWLEDGE_BASE_PATH: Path = Path(
        os.getenv("KNOWLEDGE_BASE_PATH", str(BASE_DIR / "rostr-hub" / "knowledge-base"))
    )

    NPAO_DEFAULT_PATTERN: str = os.getenv("NPAO_DEFAULT_PATTERN", "sequential")
    NPAO_MAX_PARALLEL_TASKS: int = int(os.getenv("NPAO_MAX_PARALLEL_TASKS", "5"))
    NPAO_TASK_TIMEOUT_MINUTES: int = int(os.getenv("NPAO_TASK_TIMEOUT_MINUTES", "30"))

    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8000"))
    API_CORS_ORIGINS: str = os.getenv("API_CORS_ORIGINS", "*")

    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")

    JWT_SECRET: str = os.getenv("JWT_SECRET", "curriculum-os-dev-secret-change-in-production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    DATA_DIR: Path = Path(os.getenv("DATA_DIR", str(BASE_DIR / "data")))

    @classmethod
    def verify(cls) -> list[str]:
        checks = []
        if cls.DEEPSEEK_API_KEY:
            checks.append("✓ DeepSeek API key configured")
        else:
            checks.append("✗ DeepSeek API key NOT configured — set DEEPSEEK_API_KEY")
        checks.append(
            f"✓ RAG DAL confidence threshold: {cls.RAGDAL_CONFIDENCE_THRESHOLD}"
        )
        checks.append(f"✓ Knowledge base path: {cls.KNOWLEDGE_BASE_PATH}")
        checks.append(f"✓ Rostr Hub: {'ready' if cls._hub_ready() else 'needs init'}")
        return checks

    @classmethod
    def _hub_ready(cls) -> bool:
        hub_path = cls.BASE_DIR / "rostr-hub"
        return hub_path.exists()


config = Config()
