"use client";
import { useState } from "react";
import { MessageIcon } from "../_icons/messageIcon";
import { ChatSection } from "../_components/chatSection";

export const ChatAssistant = () => {
  const [state, setState] = useState(false);
  return (
    <div className="w-full h-full flex justify-end items-end">
      {state === true ? (
        <div className="w-full h-full fixed z-50 flex items-end justify-end top-0 left-0">
          <ChatSection changeState={() => setState(false)} />
        </div>
      ) : (
        <button
          className="w-12 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer mb-9 mr-9"
          onClick={() => setState(true)}
        >
          <MessageIcon />
        </button>
      )}
    </div>
  );
};
