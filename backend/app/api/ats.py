from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

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
    Compare uploaded resume with a Job Description
    and generate an ATS score using single AI call.
    """
    result = ATSService.analyze(request.job_description)
    return ATSResponse(**result)


# ============================================================
# CrewAI ATS endpoint (deep analysis, 4 agents)
# ============================================================
@router.post("/ats-score-crew", response_model=CrewATSResponse)
async def ats_score_crew(request: ATSRequest):
    """
    Deep ATS analysis using 4 CrewAI agents:
    - Resume Analyzer
    - JD Matcher
    - ATS Scorer
    - Career Coach
    """
    result = CrewService.analyze_resume_with_jd(request.job_description)
    return CrewATSResponse(**result)