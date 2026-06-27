import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process, LLM
from app.services.vector_store import VectorStoreService
from app.services.rag_service import RAGService

load_dotenv()


def get_llm():
    return LLM(
        model="groq/llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY"),
    )


class CrewService:

    @staticmethod
    def analyze_resume_with_jd(job_description: str):

        # Get resume text
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
                "suggestions": [],
                "career_advice": "Please upload your resume first.",
                "crew_analysis": ""
            }

        llm = get_llm()

        # ============================================================
        # Agent 1: Resume Analyzer
        # ============================================================
        resume_analyzer = Agent(
            role="Resume Analyzer",
            goal="Carefully read and extract all key information from the resume",
            backstory="""You are an expert HR professional with 15 years of experience 
            reading resumes. You extract skills, experience, education, and achievements 
            with high accuracy.""",
            llm=llm,
            verbose=False,
            allow_delegation=False,
        )

        # ============================================================
        # Agent 2: JD Matcher
        # ============================================================
        jd_matcher = Agent(
            role="Job Description Matcher",
            goal="Compare the resume against the job description and identify matches and gaps",
            backstory="""You are a technical recruiter who specializes in matching 
            candidates to job descriptions. You identify exactly which skills match 
            and which are missing.""",
            llm=llm,
            verbose=False,
            allow_delegation=False,
        )

        # ============================================================
        # Agent 3: ATS Scorer
        # ============================================================
        ats_scorer = Agent(
            role="ATS Score Calculator",
            goal="Calculate an accurate ATS score based on keyword matching and resume quality",
            backstory="""You are an ATS system expert who understands exactly how 
            Applicant Tracking Systems work. You calculate scores based on keyword 
            density, skill matches, and formatting quality.""",
            llm=llm,
            verbose=False,
            allow_delegation=False,
        )

        # ============================================================
        # Agent 4: Career Coach
        # ============================================================
        career_coach = Agent(
            role="Career Coach",
            goal="Provide actionable resume improvement suggestions and career advice",
            backstory="""You are a senior career coach who has helped thousands of 
            candidates land their dream jobs. You give specific, actionable advice 
            to improve resumes and increase interview chances.""",
            llm=llm,
            verbose=False,
            allow_delegation=False,
        )

        # ============================================================
        # Task 1: Analyze Resume
        # ============================================================
        task_analyze = Task(
            description=f"""
            Analyze this resume carefully and extract:
            1. Candidate's name
            2. All technical skills
            3. Work experience summary
            4. Education details
            5. Key achievements

            Resume:
            {resume_text[:4000]}
            """,
            expected_output="A structured summary of the resume with name, skills, experience, education, and achievements.",
            agent=resume_analyzer,
        )

        # ============================================================
        # Task 2: Match JD
        # ============================================================
        task_match = Task(
            description=f"""
            Compare the resume (analyzed in the previous task) against this job description.
            
            Job Description:
            {job_description}

            Identify:
            1. Skills that match between resume and JD
            2. Skills required in JD but missing from resume
            3. Experience level match
            """,
            expected_output="A list of matched skills, missing skills, and experience level assessment.",
            agent=jd_matcher,
            context=[task_analyze],
        )

        # ============================================================
        # Task 3: Calculate ATS Score
        # ============================================================
        task_score = Task(
            description=f"""
            Based on the resume analysis and JD matching results, calculate an ATS score from 0-100.
            
            Consider:
            - Keyword match percentage (40%)
            - Skills coverage (30%)
            - Experience relevance (20%)
            - Overall resume quality (10%)

            Job Description Keywords:
            {job_description[:1000]}

            Return your response in this EXACT JSON format:
            {{
                "ats_score": 75,
                "matched_skills": ["Python", "FastAPI", "SQL"],
                "missing_skills": ["Docker", "Kubernetes"],
                "score_breakdown": {{
                    "keyword_match": 30,
                    "skills_coverage": 25,
                    "experience_relevance": 15,
                    "resume_quality": 5
                }}
            }}
            """,
            expected_output="JSON with ats_score, matched_skills, missing_skills, and score_breakdown.",
            agent=ats_scorer,
            context=[task_analyze, task_match],
        )

        # ============================================================
        # Task 4: Career Advice
        # ============================================================
        task_advice = Task(
            description=f"""
            Based on all the analysis done so far, provide specific career coaching advice.

            Give:
            1. Top 5 specific suggestions to improve the resume for this role
            2. Key skills to learn/add
            3. How to reword experience to better match the JD
            4. Interview preparation tips

            Job Description:
            {job_description[:1000]}
            """,
            expected_output="Detailed career advice with specific actionable suggestions.",
            agent=career_coach,
            context=[task_analyze, task_match, task_score],
        )

        # ============================================================
        # Run the Crew
        # ============================================================
        crew = Crew(
            agents=[resume_analyzer, jd_matcher, ats_scorer, career_coach],
            tasks=[task_analyze, task_match, task_score, task_advice],
            process=Process.sequential,
            verbose=False,
        )

        try:
            result = crew.kickoff()

            # Extract JSON from ATS scorer task
            import json
            import re

            score_output = task_score.output.raw if task_score.output else ""
            advice_output = task_advice.output.raw if task_advice.output else ""

            # Try to parse JSON from score output
            json_match = re.search(r'\{.*\}', score_output, re.DOTALL)
            if json_match:
                data = json.loads(json_match.group())
                ats_score = int(data.get("ats_score", 0))
                matched_skills = data.get("matched_skills", [])
                missing_skills = data.get("missing_skills", [])
            else:
                ats_score = 0
                matched_skills = []
                missing_skills = []

            # Extract suggestions from advice
            suggestions = []
            if advice_output:
                lines = advice_output.split("\n")
                for line in lines:
                    line = line.strip()
                    if line and len(line) > 20 and not line.startswith("#"):
                        suggestions.append(line)
                suggestions = suggestions[:6]

            return {
                "ats_score": ats_score,
                "matched_skills": matched_skills,
                "missing_skills": missing_skills,
                "suggestions": suggestions,
                "career_advice": advice_output[:1000] if advice_output else "",
                "crew_analysis": str(result)[:500] if result else ""
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