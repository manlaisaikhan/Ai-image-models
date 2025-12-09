"use client";
import { useState, useEffect } from "react";
import { ExitIcon } from "../_icons/exitIcon";
import { SendMessageIcon } from "../_icons/sendMessageIcon";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  changeState: () => void;
};

export const ChatSection = ({ changeState }: Props) => {
  const [userMessage, setUserMessage] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAssistantMessages(["Hello! How can I help you?"]);
    }, 150);
  }, []);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const currentUserMessage = userMessage;
    setUserMessage("");
    setAssistantMessages((prev) => [...prev, `You: ${currentUserMessage}`]);
    setLoading(true);

    try {
      const data = await (
        await fetch("/api/chatAssistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat: currentUserMessage }),
        })
      ).json();

      const answer =
        data?.res?.candidates?.[0]?.content?.parts?.[0]?.text ?? "…";

      setAssistantMessages((prev) => [...prev, answer]);
    } catch {
      setAssistantMessages((prev) => [...prev, "Error occurred"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[380px] h-[472px] border bg-white border-zinc-200 rounded-lg flex flex-col justify-between mr-9 mb-9">
      <div className="w-full h-12 border-b border-zinc-200 flex items-center justify-between pl-4 pr-4">
        <p className="text-black text-[16px] font-medium">Chat assistant</p>
        <button
          className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center cursor-pointer"
          onClick={changeState}
        >
          <ExitIcon />
        </button>
      </div>
      <div className="flex flex-col gap-2 justify-start w-full h-full pt-4 overflow-y-auto custom-scroll px-6">
        {assistantMessages.map((msg, index) => (
          <div
            key={index}
            className={`w-fit max-w-[260px] min-h-9 rounded-xl px-4 py-2 text-[14px] 
            ${
              msg.startsWith("You:")
                ? "bg-[#F4F4F5] text-black self-end"
                : "bg-black text-white self-start"
            }
            transition-opacity duration-500 ease-out opacity-0 animate-fadeIn
            `}
          >
            {msg.replace("You: ", "")}
          </div>
        ))}

        {loading && (
          <div className="w-fit max-w-[260px] min-h-9 bg-black rounded-xl px-4 py-2 text-white text-[14px] flex gap-1 items-center animate-fadeIn">
            Please wait <Spinner />
          </div>
        )}
      </div>
      <div className="w-full min-h-14 border-t border-zinc-200 flex items-center justify-around">
        <textarea
          className="w-[300px] h-10 rounded-lg border border-zinc-200 outline-none text-[#71717a] font-normal text-[14px] pl-3 pr-3 pb-2 pt-2"
          placeholder="Type your message..."
          onChange={(e) => setUserMessage(e.target.value)}
          value={userMessage}
        />
        <button
          className="w-10 h-10 rounded-full bg-black cursor-pointer flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <SendMessageIcon />
        </button>
      </div>
    </div>
  );
};
