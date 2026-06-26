"use client";

import { useState } from "react";
import { askResume } from "@/services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatSection() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await askResume(question);

      const aiMessage: Message = {
        role: "assistant",
        content: response.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        AI Resume Chat
      </h2>

      <div className="mt-6 h-96 overflow-y-auto rounded-2xl bg-slate-800 p-6">

        {messages.length === 0 && (
          <p className="text-slate-400">
            Ask anything about your resume...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[80%] rounded-xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-700 text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-cyan-400">
            AI is thinking...
          </p>
        )}

      </div>

      <div className="mt-6 flex gap-3">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask anything about your resume..."
          className="flex-1 rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          Send
        </button>

      </div>

    </section>
  );
}