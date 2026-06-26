"use client";

interface DashboardAnalyticsProps {
  summary: {
    name: string;
    skills: string;
    experience: string;
    education: string;
  };
}

export default function DashboardAnalytics({
  summary,
}: DashboardAnalyticsProps) {
  const skillsCount = summary.skills
    ? summary.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean).length
    : 0;

  const experienceCount = summary.experience ? 1 : 0;
  const educationCount = summary.education ? 1 : 0;

  // Temporary values until backend analytics is added
  const projectsCount = 4;
  const certificationsCount = 2;
  const resumeScore = Math.min(
    100,
    60 +
      skillsCount +
      projectsCount * 3 +
      certificationsCount * 2
  );

  const cards = [
    {
      title: "Resume Score",
      value: `${resumeScore}%`,
    },
    {
      title: "Skills",
      value: skillsCount,
    },
    {
      title: "Projects",
      value: projectsCount,
    },
    {
      title: "Experience",
      value: experienceCount,
    },
    {
      title: "Education",
      value: educationCount,
    },
    {
      title: "Certifications",
      value: certificationsCount,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Resume Analytics Dashboard
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl bg-slate-800 p-6 border border-slate-700"
          >
            <p className="text-sm text-slate-400">
              {card.title}
            </p>

            <h3 className="mt-4 text-4xl font-bold text-cyan-400">
              {card.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}