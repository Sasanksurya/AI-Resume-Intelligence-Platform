"use client";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">

        <h2 className="text-2xl font-bold text-white">
          Nexaura
        </h2>

        <p className="mt-2 text-slate-400">
          Resume • ATS • Career Growth
        </p>

        <p className="mt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Nexaura. All rights reserved.
        </p>

      </div>
    </footer>
  );
}