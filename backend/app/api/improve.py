from fastapi import APIRouter

from app.services.improve_service import ImproveService

router = APIRouter()


@router.get("/improve")
async def improve_resume():

    result = ImproveService.improve()

    return result