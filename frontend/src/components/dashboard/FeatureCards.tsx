"use client";

import {
  Upload,
  MessageSquare,
  ShieldCheck,
  Users,
  Sparkles,
  BarChart3,
} from "lucide-react";

const cards = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume in PDF format and get started.",
    href: "#upload",
  },
  {
    icon: MessageSquare,
    title: "AI Resume Chat",
    description: "Ask any question about your resume.",
    href: "#chat",
  },
  {
    icon: ShieldCheck,
    title: "ATS Analysis",
    description: "Get ATS score and matched skills.",
    href: "#ats",
  },
  {
    icon: Users,
    title: "Interview AI",
    description: "Generate interview questions instantly.",
    href: "#interview",
  },
  {
    icon: Sparkles,
    title: "Improve Resume",
    description: "Receive AI-powered resume suggestions.",
    href: "#improve",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "View resume insights and analytics.",
    href: "#analytics",
  },
];

export default function FeatureCards() {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <a
            key={card.title}
            href={card.href}
            className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition duration-300 hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            <div className="mb-4 inline-flex rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
              <Icon size={28} />
            </div>

            <h3 className="text-xl font-semibold text-white">
              {card.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {card.description}
            </p>
          </a>
        );
      })}
    </section>
  );
}