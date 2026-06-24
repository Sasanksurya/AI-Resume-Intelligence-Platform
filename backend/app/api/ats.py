from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ats_service import ATSService

router = APIRouter()


class ATSRequest(BaseModel):
    job_description: str


class ATSResponse(BaseModel):
    ats_score: int
    matched_skills: list[str]
    missing_skills: list[str]
    suggestions: list[str]


@router.post("/ats-score", response_model=ATSResponse)
async def ats_score(request: ATSRequest):
    """
    Compare uploaded resume with a Job Description
    and generate an ATS score.
    """

    result = ATSService.analyze(request.job_description)

    return ATSResponse(**result)