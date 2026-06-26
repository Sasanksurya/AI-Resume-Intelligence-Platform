"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          <Image
            src="/logo/nexaura-logo.png"
            alt="Nexaura Logo"
            width={55}
            height={55}
            className="rounded-xl"
          />

          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white">
              Nexaura
            </h1>

            <p className="text-sm text-cyan-400">
              Analyze • Optimize • Get Hired
            </p>
          </div>

        </div>

        {/* Right Side */}
        <nav className="flex items-center gap-6">

          <button className="text-sm font-medium text-slate-300 transition hover:text-cyan-400">
            Dashboard
          </button>

          <button className="text-sm font-medium text-slate-300 transition hover:text-cyan-400">
            GitHub
          </button>

          <button className="text-sm font-medium text-slate-300 transition hover:text-cyan-400">
            Documentation
          </button>

          <button className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:bg-cyan-400 hover:shadow-cyan-500/40">
            Upload Resume
          </button>

        </nav>

      </div>
    </header>
  );
}