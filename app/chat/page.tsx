import ChatContainer from "@/components/ChatContainer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen  bg-[#FBFFE4] flex flex-col">
      <header className="py-4 px-6"></header>

      <main className="flex-1 max-w-7xl w-full mx-auto rounded-lg  no-scrollbar overflow-hidden">
        <div className="h-screen flex flex-col no-scrollbar">
          <Suspense>
            <ChatContainer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
