"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-12">

      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">

        {/* Left Section */}
        <div>

          <div className="mb-6 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-400">
            RESUME • ATS • CAREER GROWTH
          </div>

          <h1 className="text-5xl font-extrabold leading-tight text-white">
            One Resume.
            <br />
            Infinite Career Opportunities.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Upload your resume once and let{" "}
            <span className="font-semibold text-cyan-400">
              Nexaura
            </span>{" "}
            analyze it, calculate ATS scores, compare it with any Job
            Description, generate interview questions, improve your resume,
            and answer resume-related questions using AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-cyan-400">
              Upload Resume
            </button>

            <button className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-slate-300 transition duration-300 hover:border-cyan-500 hover:text-cyan-400">
              Learn More
            </button>

          </div>

          {/* Statistics */}

          <div className="mt-10 grid grid-cols-3 gap-5">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">
              <h3 className="text-3xl font-bold text-cyan-400">AI</h3>
              <p className="mt-2 text-sm text-slate-400">
                Powered
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">
              <h3 className="text-3xl font-bold text-cyan-400">ATS</h3>
              <p className="mt-2 text-sm text-slate-400">
                Optimization
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center">
              <h3 className="text-3xl font-bold text-cyan-400">24/7</h3>
              <p className="mt-2 text-sm text-slate-400">
                Career Assistant
              </p>
            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="relative flex items-center justify-center">

          <div className="absolute h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">

            <div className="flex justify-center">
              <Image
                src="/nexaura_logo.png"
                alt="Nexaura Logo"
                width={112}
                height={112}
                priority
                className="h-28 w-28 object-contain"
              />
            </div>

            <h3 className="mt-6 text-center text-3xl font-bold text-white">
              Nexaura AI
            </h3>

            <p className="mt-3 text-center text-slate-400">
              Resume Intelligence Platform
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-between rounded-xl bg-slate-800/60 p-4">
                <span className="text-slate-300">
                  ATS Analysis
                </span>

                <span className="font-semibold text-emerald-400">
                  ✓ Ready
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-800/60 p-4">
                <span className="text-slate-300">
                  Resume AI Chat
                </span>

                <span className="font-semibold text-emerald-400">
                  ✓ Active
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-800/60 p-4">
                <span className="text-slate-300">
                  Interview Preparation
                </span>

                <span className="font-semibold text-emerald-400">
                  ✓ Ready
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-800/60 p-4">
                <span className="text-slate-300">
                  Resume Improvement
                </span>

                <span className="font-semibold text-emerald-400">
                  ✓ AI Powered
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}