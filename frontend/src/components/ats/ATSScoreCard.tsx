interface ATSScoreCardProps {
  score: number;
}

export default function ATSScoreCard({
  score,
}: ATSScoreCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">
        ATS Score
      </h2>

      <div className="flex items-center justify-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-blue-600">
          <span className="text-4xl font-bold text-blue-600">
            {score}%
          </span>
        </div>
      </div>
    </div>
  );
}