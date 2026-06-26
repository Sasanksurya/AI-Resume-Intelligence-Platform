"use client";

import { useState } from "react";
import { getInterviewQuestions } from "@/services/api";

interface InterviewQuestion {
  question: string;
  answer: string;
}

export default function InterviewSection() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const generateQuestions = async () => {
    try {
      setLoading(true);

      const result = await getInterviewQuestions();

      setQuestions(result.questions || []);
    } catch (error) {
      console.error(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          AI Interview Preparation
        </h2>

        <button
          onClick={generateQuestions}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      <div className="mt-8 space-y-5">
        {questions.length === 0 ? (
          <p className="text-slate-400">
            Click <strong>&quot;Generate Questions&quot;</strong> to prepare for
            your interview.
          </p>
        ) : (
          questions.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-5 transition-all duration-300"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-cyan-400">
                  {index + 1}. {item.question}
                </h3>

                <span className="text-xl text-slate-300">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="mt-4 rounded-xl bg-slate-700 p-4">
                  <p className="whitespace-pre-line text-slate-100">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}