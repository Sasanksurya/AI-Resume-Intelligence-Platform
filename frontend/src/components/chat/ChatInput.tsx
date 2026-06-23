"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

export default function ChatInput({
  onSend,
  loading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    onSend(trimmed);
    setMessage("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-lg">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Ask anything about your resume..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="flex-1 rounded-xl bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-cyan-500"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="rounded-xl bg-cyan-500 p-3 text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>
      </div>

      <div className="mt-4 text-xs text-slate-400">
        <p className="font-medium">Try asking:</p>

        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Summarize my resume</li>
          <li>What are my technical skills?</li>
          <li>What projects have I completed?</li>
          <li>What certifications do I have?</li>
        </ul>
      </div>
    </div>
  );
}