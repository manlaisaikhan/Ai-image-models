"use client";
import { Models } from "./_components/models";
import { ChatAssistant } from "./_features/chatAssistant";
import { Header } from "./_features/header";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col gap-6">
      <Header />
      <Models />
      <ChatAssistant />
    </div>
  );
}
