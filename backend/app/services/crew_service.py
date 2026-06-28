import os
import json
import re
from groq import Groq
from dotenv import load_dotenv
from app.services.vector_store import VectorStoreService
from app.services.rag_service import RAGService

load_dotenv()


class CrewService:

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    @staticmethod
    def _call_agent(system_role: str, task: str) -> str:
        try:
            response = CrewService.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": system_role},
                    {"role": "user", "content": task},
                ],
                max_tokens=1500,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"Agent error: {str(e)}"

    @staticmethod
    def analyze_resume_with_jd(job_description: str):
        try:
            resume_text = VectorStoreService.load_resume_text()

            if not resume_text.strip():
                try:
                    docs = RAGService.search("resume skills experience")
                    resume_text = "\n\n".join(doc.page_content for doc in docs)
                except Exception:
                    pass

            if not resume_text.strip():
                return {
                    "ats_score": 0,
                    "matched_skills": [],
                    "missing_skills": [],
                    "suggestions": ["Please upload your resume first."],
                    "career_advice": "",
                    "crew_analysis": ""
                }

            # ============================================================
            # Agent 1: Resume Analyzer
            # ============================================================
            agent1_output = CrewService._call_agent(
                system_role="You are an expert HR professional with 15 years of experience reading resumes. Extract key information accurately.",
                task=f"""
                Analyze this resume and extract:
                1. All technical skills
                2. Work experience summary
                3. Education details
                4. Key achievements

                Resume:
                {resume_text[:3000]}
                """
            )

            # ============================================================
            # Agent 2: JD Matcher
            # ============================================================
            agent2_output = CrewService._call_agent(
                system_role="You are a technical recruiter who specializes in matching candidates to job descriptions.",
                task=f"""
                Based on this resume analysis:
                {agent1_output[:1000]}

                Compare against this Job Description:
                {job_description[:2000]}

                List:
                1. Skills that match
                2. Skills missing from resume
                3. Experience level assessment
                """
            )

            # ============================================================
            # Agent 3: ATS Scorer
            # ============================================================
            agent3_output = CrewService._call_agent(
                system_role="You are an ATS expert. You ONLY respond with valid JSON. No extra text.",
                task=f"""
                Based on this matching analysis:
                {agent2_output[:1000]}

                Calculate ATS score and return ONLY this JSON:
                {{
                    "ats_score": 75,
                    "matched_skills": ["Python", "FastAPI", "SQL"],
                    "missing_skills": ["Docker", "Kubernetes"]
                }}
                """
            )

            # ============================================================
            # Agent 4: Career Coach
            # ============================================================
            agent4_output = CrewService._call_agent(
                system_role="You are a senior career coach who gives specific actionable resume advice.",
                task=f"""
                Based on this resume vs job description analysis:
                {agent2_output[:1000]}

                Give 5 specific actionable suggestions to improve the resume for this role.
                Be specific and practical.

                Job Description:
                {job_description[:500]}
                """
            )

            # Parse ATS score from Agent 3
            json_match = re.search(r'\{.*?\}', agent3_output, re.DOTALL)
            if json_match:
                try:
                    data = json.loads(json_match.group())
                    ats_score = int(data.get("ats_score", 0))
                    matched_skills = data.get("matched_skills", [])
                    missing_skills = data.get("missing_skills", [])
                except Exception:
                    ats_score = 0
                    matched_skills = []
                    missing_skills = []
            else:
                ats_score = 0
                matched_skills = []
                missing_skills = []

            # Parse suggestions from Agent 4
            suggestions = []
            for line in agent4_output.split("\n"):
                line = line.strip().lstrip("0123456789.-) *")
                if len(line) > 20:
                    suggestions.append(line)
            suggestions = suggestions[:6]

            return {
                "ats_score": ats_score,
                "matched_skills": matched_skills,
                "missing_skills": missing_skills,
                "suggestions": suggestions,
                "career_advice": agent4_output[:1500],
                "crew_analysis": f"Agent 1 (Resume Analyzer) → Agent 2 (JD Matcher) → Agent 3 (ATS Scorer) → Agent 4 (Career Coach)"
            }

        except Exception as e:
            return {
                "ats_score": 0,
                "matched_skills": [],
                "missing_skills": [],
                "suggestions": [f"Error: {str(e)}"],
                "career_advice": "",
                "crew_analysis": ""
            }