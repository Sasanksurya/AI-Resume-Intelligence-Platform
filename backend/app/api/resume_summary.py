from fastapi import APIRouter, HTTPException
from app.services.resume_summary_service import ResumeSummaryService

router = APIRouter()


@router.get("/resume-summary")
async def get_resume_summary():
    """
    Returns AI-generated resume summary.
    """

    try:
        summary = ResumeSummaryService.generate_summary()

        return {
            "success": True,
            "summary": summary
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )