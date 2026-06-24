import ATSScoreCard from "./ATSScoreCard";
import MatchedSkills from "./MatchedSkills";
import MissingSkills from "./MissingSkills";
import Suggestions from "./Suggestions";

interface ATSResultProps {
  result: {
    ats_score: number;
    matched_skills: string[];
    missing_skills: string[];
    suggestions: string[];
  } | null;
}

export default function ATSResult({ result }: ATSResultProps) {
  if (!result) {
    return (
      <div className="rounded-xl border border-gray-300 bg-white p-6 text-center">
        <p className="text-gray-500">
          Analyze a Job Description to see the ATS results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ATSScoreCard score={result.ats_score} />

      <MatchedSkills skills={result.matched_skills} />

      <MissingSkills skills={result.missing_skills} />

      <Suggestions suggestions={result.suggestions} />
    </div>
  );
}