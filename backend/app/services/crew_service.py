import os
import json
import re
from dotenv import load_dotenv

load_dotenv()


class CrewService:

    @staticmethod
    def analyze_resume_with_jd(job_description: str):
        try:
            from crewai import Agent, Task, Crew, Process, LLM
            from app.services.vector_store import VectorStoreService
            from app.services.rag_service import RAGService

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

            llm = LLM(
                model="groq/llama-3.3-70b-versatile",
                api_key=os.getenv("GROQ_API_KEY"),
            )

            resume_analyzer = Agent(
                role="Resume Analyzer",
                goal="Extract all key information from the resume",
                backstory="You are an expert HR professional with 15 years of experience reading resumes.",
                llm=llm,
                verbose=False,
                allow_delegation=False,
            )

            jd_matcher = Agent(
                role="Job Description Matcher",
                goal="Compare resume against job description and identify matches and gaps",
                backstory="You are a technical recruiter who matches candidates to job descriptions.",
                llm=llm,
                verbose=False,
                allow_delegation=False,
            )

            ats_scorer = Agent(
                role="ATS Score Calculator",
                goal="Calculate accurate ATS score based on keyword matching",
                backstory="You are an ATS system expert who calculates scores based on keyword density and skill matches.",
                llm=llm,
                verbose=False,
                allow_delegation=False,
            )

            career_coach = Agent(
                role="Career Coach",
                goal="Provide actionable resume improvement suggestions",
                backstory="You are a senior career coach who gives specific advice to improve resumes.",
                llm=llm,
                verbose=False,
                allow_delegation=False,
            )

            task_analyze = Task(
                description=f"""
                Analyze this resume and extract:
                1. All technical skills
                2. Work experience summary
                3. Education details
                4. Key achievements

                Resume:
                {resume_text[:3000]}
                """,
                expected_output="Structured summary of resume with skills, experience, education, achievements.",
                agent=resume_analyzer,
            )

            task_match = Task(
                description=f"""
                Compare the resume against this job description.

                Job Description:
                {job_description[:2000]}

                Identify matched skills, missing skills, and experience level match.
                """,
                expected_output="List of matched skills, missing skills, and experience assessment.",
                agent=jd_matcher,
                context=[task_analyze],
            )

            task_score = Task(
                description=f"""
                Calculate ATS score from 0-100 based on resume vs job description match.

                Job Description:
                {job_description[:1000]}

                Return ONLY this JSON format:
                {{
                    "ats_score": 75,
                    "matched_skills": ["Python", "FastAPI"],
                    "missing_skills": ["Docker", "Kubernetes"]
                }}
                """,
                expected_output="JSON with ats_score, matched_skills, missing_skills.",
                agent=ats_scorer,
                context=[task_analyze, task_match],
            )

            task_advice = Task(
                description=f"""
                Give 5 specific suggestions to improve the resume for this role.

                Job Description:
                {job_description[:1000]}

                Give clear actionable bullet points.
                """,
                expected_output="5 specific actionable suggestions to improve resume.",
                agent=career_coach,
                context=[task_analyze, task_match, task_score],
            )

            crew = Crew(
                agents=[resume_analyzer, jd_matcher, ats_scorer, career_coach],
                tasks=[task_analyze, task_match, task_score, task_advice],
                process=Process.sequential,
                verbose=False,
            )

            crew.kickoff()

            score_output = task_score.output.raw if task_score.output else ""
            advice_output = task_advice.output.raw if task_advice.output else ""

            json_match = re.search(r'\{.*?\}', score_output, re.DOTALL)
            if json_match:
                data = json.loads(json_match.group())
                ats_score = int(data.get("ats_score", 0))
                matched_skills = data.get("matched_skills", [])
                missing_skills = data.get("missing_skills", [])
            else:
                ats_score = 0
                matched_skills = []
                missing_skills = []

            suggestions = []
            if advice_output:
                for line in advice_output.split("\n"):
                    line = line.strip().lstrip("0123456789.-) ")
                    if len(line) > 20:
                        suggestions.append(line)
                suggestions = suggestions[:6]

            return {
                "ats_score": ats_score,
                "matched_skills": matched_skills,
                "missing_skills": missing_skills,
                "suggestions": suggestions,
                "career_advice": advice_output[:1500] if advice_output else "",
                "crew_analysis": ""
            }

        except Exception as e:
            return {
                "ats_score": 0,
                "matched_skills": [],
                "missing_skills": [],
                "suggestions": [f"CrewAI Error: {str(e)}"],
                "career_advice": "",
                "crew_analysis": ""
            }