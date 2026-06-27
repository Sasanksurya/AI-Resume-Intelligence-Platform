from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import asyncio

from app.services.ats_service import ATSService
from app.services.crew_service import CrewService

router = APIRouter()


class ATSRequest(BaseModel):
    job_description: str


class ATSResponse(BaseModel):
    ats_score: int
    matched_skills: list[str]
    missing_skills: list[str]
    suggestions: list[str]


class CrewATSResponse(BaseModel):
    ats_score: int
    matched_skills: list[str]
    missing_skills: list[str]
    suggestions: list[str]
    career_advice: Optional[str] = ""
    crew_analysis: Optional[str] = ""


# ============================================================
# Original ATS endpoint (fast, single AI call)
# ============================================================
@router.post("/ats-score", response_model=ATSResponse)
async def ats_score(request: ATSRequest):
    """
    Fast ATS analysis using single AI call.
    """
    result = ATSService.analyze(request.job_description)
    return ATSResponse(**result)


# ============================================================
# CrewAI ATS endpoint (deep analysis, 4 agents)
# ============================================================
@router.post("/ats-score-crew", response_model=CrewATSResponse)
async def ats_score_crew(request: ATSRequest):
    """
    Deep ATS analysis using 4 CrewAI agents.
    Runs in thread executor to avoid event loop conflicts.
    """
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(
        None,
        CrewService.analyze_resume_with_jd,
        request.job_description
    )
    return CrewATSResponse(**result)