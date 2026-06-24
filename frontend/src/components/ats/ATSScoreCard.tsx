"use client";

import { useEffect, useState } from "react";

interface ATSScoreCardProps {
  score: number;
}

export default function ATSScoreCard({
  score,
}: ATSScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current += 1;

      if (current >= score) {
        current = score;
        clearInterval(timer);
      }

      setAnimatedScore(current);
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const progress =
    circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
        ATS Score
      </h2>

      <div className="flex justify-center">
        <div className="relative h-52 w-52">

          <svg
            className="h-52 w-52 -rotate-90"
            viewBox="0 0 180 180"
          >
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="transparent"
            />

            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke={getColor()}
              strokeWidth="12"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              style={{
                transition:
                  "stroke-dashoffset 1.5s ease",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1
              className="text-5xl font-bold"
              style={{ color: getColor() }}
            >
              {animatedScore}%
            </h1>

            <p className="mt-2 text-gray-500">
              Resume Match
            </p>
          </div>

        </div>
      </div>

      <div className="mt-8">

        {score >= 80 && (
          <div className="rounded-lg bg-green-100 p-3 text-center font-semibold text-green-700">
            Excellent Resume Match 🎉
          </div>
        )}

        {score >= 60 && score < 80 && (
          <div className="rounded-lg bg-yellow-100 p-3 text-center font-semibold text-yellow-700">
            Good Match 👍
          </div>
        )}

        {score < 60 && (
          <div className="rounded-lg bg-red-100 p-3 text-center font-semibold text-red-700">
            Needs Improvement 🚀
          </div>
        )}

      </div>
    </div>
  );
}