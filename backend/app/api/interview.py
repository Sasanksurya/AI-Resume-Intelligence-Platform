from fastapi import APIRouter

from app.services.interview_service import InterviewService

router = APIRouter()


@router.get("/interview")
async def generate_interview():

    questions = InterviewService.generate()

    return {
        "questions": questions
    }