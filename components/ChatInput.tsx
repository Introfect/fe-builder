import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./Providers";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const { mutate: handleSend, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageName: message }),
      });

      const data = (await response.json()) as any;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-initial-messages"] });
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4 border-t bg-[#A3D1C6]"
    >
      <div className="flex-1 relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="pr-10 bg-white py-6 resize-none"
          disabled={disabled}
        />
      </div>
      <Button
        type="submit"
        size="icon"
        onClick={() => handleSend()}
        className="h-12 w-12 flex items-center justify-center flex-shrink-0 bg-amber-700 rounded-full"
        disabled={!message.trim() || disabled}
      >
        {isPending ? (
          <LoaderCircle className="animate-spin w-4" />
        ) : (
          <Send size={20} />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
