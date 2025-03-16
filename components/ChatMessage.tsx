"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import AICodeResponse from "./AICodeResponse";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: any;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 bg-chat-assistant text-white">
          <Bot size={18} />
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          isUser
            ? "bg-[#B3D8A8] text-foreground rounded-tr-none"
            : "bg-[#3D8D7A] text-chat-assistant-text rounded-tl-none"
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content[0].text.value}
          </p>
        ) : (
          <AICodeResponse response={message.content[0].text.value} />
        )}
        <div
          className={cn(
            "text-xs mt-1 opacity-70 text-right",
            isUser ? "text-gray-600" : "text-gray-100"
          )}
        ></div>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
          <User size={18} />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
