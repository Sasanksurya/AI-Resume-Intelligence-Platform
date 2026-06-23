import {
  FileText,
  Target,
  Brain,
  Briefcase,
} from "lucide-react";

const stats = [
  {
    title: "Total Resumes",
    value: "12",
    icon: FileText,
    color: "text-cyan-400",
  },
  {
    title: "ATS Score",
    value: "92%",
    icon: Target,
    color: "text-green-400",
  },
  {
    title: "Skill Match",
    value: "85%",
    icon: Brain,
    color: "text-purple-400",
  },
  {
    title: "Job Matches",
    value: "48",
    icon: Briefcase,
    color: "text-orange-400",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg hover:border-cyan-500 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <Icon className={`h-10 w-10 ${item.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}