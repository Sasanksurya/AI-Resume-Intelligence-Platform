import ChatWindow from "@/components/chart/ChatWindow";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-3xl font-bold text-white">
        AI Resume Chat
      </h1>

      <ChatWindow />
    </div>
  );
}