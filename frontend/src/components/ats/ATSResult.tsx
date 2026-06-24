import ATSScoreCard from "./ATSScoreCard";
import MatchedSkills from "./MatchedSkills";
import MissingSkills from "./MissingSkills";
import Suggestions from "./Suggestions";
import { generateATSReport } from "@/utils/generateATSReport";

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

  const handleDownload = () => {
    generateATSReport({
      score: result.ats_score,
      matchedSkills: result.matched_skills,
      missingSkills: result.missing_skills,
      suggestions: result.suggestions,
    });
  };

  return (
    <div className="space-y-6">
      <ATSScoreCard score={result.ats_score} />

      <MatchedSkills skills={result.matched_skills} />

      <MissingSkills skills={result.missing_skills} />

      <Suggestions suggestions={result.suggestions} />

      <button
        onClick={handleDownload}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold transition hover:bg-blue-700"
      >
        📄 Download ATS Report
      </button>
    </div>
  );
}