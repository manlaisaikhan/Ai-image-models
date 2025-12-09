"use client";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { ExitIcon } from "../_icons/exitIcon";
import { SendMessageIcon } from "../_icons/sendMessageIcon";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  changeState: () => void;
};

export const ChatSection = ({ changeState }: Props) => {
  const [userMessage, setUserMessage] = useState("");
  const [assistantMessage, setAssistantMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setAssistantMessage(["Hello! How can I help you?"]);
    }, 250);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [assistantMessage, loading]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    const currentUserMessage = userMessage;
    setUserMessage("");
    setAssistantMessage((prev) => [...prev, `You: ${currentUserMessage}`]);
    setLoading(true);
    try {
      const data = await (
        await fetch("/api/chatAssistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat: currentUserMessage,
          }),
        })
      ).json();
      const answer =
        data?.res?.candidates?.[0].content?.parts?.[0].text ??
        "Sorry something wrong 🥲";
      setAssistantMessage((prev) => [...prev, answer]);
    } catch (err) {
      console.log(err, "error from client");
      setAssistantMessage((prev) => [...prev, "Error occured"]);
    } finally {
      setLoading(false);
    }
  };

  console.log(assistantMessage, "this is assistant message");

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
      <div className="flex flex-col gap-2 justify-start w-full min-h-0 pt-4 overflow-y-auto px-6 grow">
        {assistantMessage.map((msg, index) => {
          return (
            <div
              className={`w-fit max-w-[260px] rounded-xl px-4 py-2 text-[14px] ${
                msg.startsWith("You:")
                  ? "bg-[#f4f4f5] text-black self-end"
                  : "bg-black text-white self-start"
              } transition-opacity duration-500 ease-out opacity-0 animate-fadeIn`}
              key={index}
            >
              {msg.replace("You: ", "")}
            </div>
          );
        })}
        {loading && (
          <div className="w-fit animate-fadeIn max-w-[258px] min-h-9 bg-black rounded-xl py-2 px-4 flex gap-1 text-white text-[14px] items-center">
            Please wait <Spinner />
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <div className="w-full min-h-14 border-t border-zinc-200 flex items-center justify-around mt-4">
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
