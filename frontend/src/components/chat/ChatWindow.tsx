"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { askQuestion } from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your AI Resume Assistant. Ask me anything about your uploaded resume.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (message: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setLoading(true);

    try {
      // Call backend
      const data = await askQuestion(message);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Sorry, I couldn't connect to the AI backend. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[80vh] flex-col rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">

      {/* Chat Messages */}
      <div className="mb-6 flex-1 space-y-4 overflow-y-auto">

        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading && <TypingIndicator />}

      </div>

      {/* Chat Input */}
      <ChatInput
        onSend={handleSend}
        loading={loading}
      />

    </div>
  );
}