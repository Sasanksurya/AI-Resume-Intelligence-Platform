from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.chat import router as chat_router
from app.api.ats import router as ats_router
from app.api.resume_summary import router as resume_summary_router
from app.api.interview import router as interview_router
from app.api.improve import router as improve_router

app = FastAPI(
    title="AI Resume Intelligence Platform",
    description="Production-grade AI Resume Intelligence Platform",
    version="1.0.0",
)

# ============================================================
# CORS Configuration
# ============================================================

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# Register API Routers
# ============================================================

app.include_router(
    upload_router,
    prefix="/api",
    tags=["Upload"],
)

app.include_router(
    resume_summary_router,
    prefix="/api",
    tags=["Resume Summary"],
)

app.include_router(
    chat_router,
    prefix="/api",
    tags=["AI Chat"],
)

app.include_router(
    ats_router,
    prefix="/api",
    tags=["ATS Analysis"],
)

app.include_router(
    interview_router,
    prefix="/api",
    tags=["Interview"],
)

app.include_router(
    improve_router,
    prefix="/api",
    tags=["Resume Improvement"],
)

# ============================================================
# Root Endpoint
# ============================================================

@app.get("/")
async def root():
    return {
        "message": "AI Resume Intelligence Platform API is Running 🚀",
        "version": "1.0.0",
        "status": "online",
    }

# ============================================================
# Health Check
# ============================================================

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "AI Resume Intelligence Platform",
    }