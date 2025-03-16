"use client";
import React, { useState, useRef, useEffect } from "react";
import ChatMessage, { Message } from "@/components/ChatMessage";
import ChatInput from "./ChatInput";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ChatContainer() {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data } = useSuspenseQuery({
    queryKey: ["get-initial-messages"],
    queryFn: async () => {
      const res = await fetch("/api/get-thread-message", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const invalidatedRes = await res.json();

      console.log(invalidatedRes);
      return invalidatedRes as any;
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-2">
        {data.data
          .slice(0)
          .reverse()
          .map((message: any) => {
            return <ChatMessage key={message.id} message={message} />;
          })}

        {isTyping && (
          <div className="flex items-center px-4 py-2">
            <div className="flex space-x-2 ml-12">
              <div
                className="w-2 h-2 bg-chat-assistant rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-chat-assistant rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
              <div
                className="w-2 h-2 bg-chat-assistant rounded-full animate-bounce"
                style={{ animationDelay: "600ms" }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={() => {}} disabled={isTyping} />
    </div>
  );
}
