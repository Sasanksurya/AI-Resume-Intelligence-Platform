from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.api.chat import router as chat_router
from app.api.ats import router as ats_router

app = FastAPI(
    title="AI Resume Intelligence Platform",
    description="Production-grade AI Resume Intelligence Platform",
    version="1.0.0",
)

# ----------------------------------------
# CORS Configuration
# ----------------------------------------
origins = [
    # Local Development
    "http://localhost:3000",
    "http://127.0.0.1:3000",

    # Your Vercel Production URL
    "https://ai-resume-intelligence-platform-coral.vercel.app",

    # Your Vercel Preview Deployment
    "https://ai-resume-intelligence-platform-l5cpolit3-surya-s-projects8.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------
# Register API Routers
# ----------------------------------------
app.include_router(
    upload_router,
    prefix="/api",
    tags=["Upload"],
)

app.include_router(
    chat_router,
    prefix="/api",
    tags=["Chat"],
)

app.include_router(
    ats_router,
    prefix="/api",
    tags=["ATS"],
)

# ----------------------------------------
# Home Route
# ----------------------------------------
@app.get("/")
def home():
    return {
        "message": "AI Resume Intelligence Platform API is Running 🚀",
        "version": "1.0.0",
    }

# ----------------------------------------
# Health Check
# ----------------------------------------
@app.get("/health")
def health():
    return {
        "status": "healthy",
    }