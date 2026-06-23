"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl bg-slate-800 px-5 py-4 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-300">
            AI is thinking
          </span>

          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}