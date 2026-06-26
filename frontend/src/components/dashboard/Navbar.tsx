"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo & Brand */}
        <Link href="/dashboard" className="flex items-center gap-4">

          <Image
            src="/nexaura_logo.png"
            alt="Nexaura Logo"
            width={58}
            height={58}
            priority
            className="rounded-full"
          />

          <Image
            src="/nexaura_title.png"
            alt="Nexaura"
            width={240}
            height={70}
            priority
            className="object-contain"
          />

        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">

          <a
            href="#upload"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Upload
          </a>

          <a
            href="#chat"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            AI Chat
          </a>

          <a
            href="#ats"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            ATS Analysis
          </a>

          <a
            href="#interview"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Interview
          </a>

          <a
            href="#improve"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Resume AI
          </a>

        </nav>

        {/* Status Badge */}
        <div className="hidden rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 lg:block">
          Resume • ATS • Career Growth
        </div>

      </div>
    </header>
  );
}