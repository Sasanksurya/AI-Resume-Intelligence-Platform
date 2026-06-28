# Nexaura — AI Resume Intelligence Platform

A production-grade, full-stack AI Resume Intelligence Platform that analyzes resumes using RAG pipelines, LangChain, FAISS, and a custom 4-agent AI system powered by Groq.

## Live Demo

- Frontend: https://ai-resume-intelligence-platform-two.vercel.app
- Backend API: https://ai-resume-intelligence-platform-api.onrender.com

## Features

- Resume Upload — Upload PDF resume and extract text automatically
- Resume Summary — AI extracts name, skills, experience, and education
- AI Resume Chat — Ask any question about your resume
- Quick ATS Analysis — Fast single AI call ATS scoring
- Deep Analysis with 4 AI Agents — Custom multi-agent pipeline
  - Agent 1 Resume Analyzer — Extracts key resume information
  - Agent 2 JD Matcher — Compares resume vs job description
  - Agent 3 ATS Scorer — Calculates ATS score with breakdown
  - Agent 4 Career Coach — Gives actionable improvement advice
- Interview Preparation — Generates 10 interview questions from resume
- Resume AI — Suggests improvements to resume content

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Deployed on Vercel

### Backend
- FastAPI
- LangChain and LangChain Community
- FAISS Vector Database
- RAG Pipeline
- Groq API with llama-3.3-70b-versatile
- PyMuPDF for PDF text extraction
- Scikit-learn TF-IDF Embeddings
- Deployed on Render

## Architecture
User uploads PDF Resume

↓

PyMuPDF extracts text from PDF

↓

Text saved to disk

↓

Text split into chunks using LangChain

↓

Chunks converted to TF-IDF vectors

↓

Vectors stored in FAISS index

↓

User requests analysis

↓

RAG retrieves relevant chunks

↓

Groq LLM generates response

↓

Result displayed to user

## Multi-Agent Pipeline
Job Description Input

↓

Agent 1 Resume Analyzer

Reads full resume text and extracts skills, experience, education

↓

Agent 2 JD Matcher

Compares resume vs job description and finds matched and missing skills

↓

Agent 3 ATS Scorer

Calculates ATS score from 0 to 100 and returns matched and missing skills

↓

Agent 4 Career Coach

Gives 5 specific improvement suggestions and detailed career advice

## Project Structure
AI-Resume-Intelligence-Platform/

│

├── frontend/

│   ├── src/

│   │   ├── app/

│   │   ├── components/

│   │   │   └── dashboard/

│   │   │       ├── UploadSection.tsx

│   │   │       ├── ChatSection.tsx

│   │   │       ├── ATSSection.tsx

│   │   │       ├── InterviewSection.tsx

│   │   │       └── ImproveSection.tsx

│   │   └── services/

│   │       └── api.ts

│   ├── .env.local

│   └── package.json

│

├── backend/

│   ├── app/

│   │   ├── api/

│   │   │   ├── upload.py

│   │   │   ├── chat.py

│   │   │   ├── ats.py

│   │   │   ├── resume_summary.py

│   │   │   ├── interview.py

│   │   │   └── improve.py

│   │   └── services/

│   │       ├── pdf_service.py

│   │       ├── chunk_service.py

│   │       ├── embedding_service.py

│   │       ├── vector_store.py

│   │       ├── rag_service.py

│   │       ├── chat_service.py

│   │       ├── ats_service.py

│   │       ├── crew_service.py

│   │       ├── interview_service.py

│   │       ├── improve_service.py

│   │       └── resume_summary_service.py

│   ├── main.py

│   └── requirements.txt

│

└── README.md

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/upload | Upload PDF resume |
| GET | /api/resume-summary | Get AI resume summary |
| POST | /api/chat | Ask question about resume |
| POST | /api/ats-score | Quick ATS analysis |
| POST | /api/ats-score-crew | Deep 4-agent ATS analysis |
| GET | /api/interview | Generate interview questions |
| GET | /api/improve | Get resume improvements |

## Local Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create backend/.env file:
GROQ_API_KEY=your_groq_api_key

Run backend:

```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
```

Create frontend/.env.local file:
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

Run frontend:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

### Backend on Render

| Key | Description |
|-----|-------------|
| GROQ_API_KEY | Groq API key from console.groq.com |

### Frontend on Vercel

| Key | Description |
|-----|-------------|
| NEXT_PUBLIC_API_URL | Backend API URL |

## Deployment

### Backend on Render
1. Connect GitHub repo to Render
2. Set Root Directory to backend
3. Set Build Command to pip install -r requirements.txt
4. Set Start Command to uvicorn app.main:app --host 0.0.0.0 --port $PORT
5. Add environment variable GROQ_API_KEY

### Frontend on Vercel
1. Connect GitHub repo to Vercel
2. Set Root Directory to frontend
3. Add environment variable NEXT_PUBLIC_API_URL
4. Deploy

## Author

Sasank Surya Thota

- GitHub: https://github.com/Sasanksurya
- LinkedIn: https://linkedin.com/in/thotasasanksurya
- Email: shashanksurya24@gmail.com

## License

MIT License