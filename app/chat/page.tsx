"use client";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/ChatContainer"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="min-h-screen  bg-[#FBFFE4] flex flex-col">
      <header className="py-4 px-6"></header>

      <main className="flex-1 max-w-7xl w-full mx-auto rounded-lg  no-scrollbar overflow-hidden">
        <div className="h-screen flex flex-col no-scrollbar">
          <DynamicComponentWithNoSSR />
        </div>
      </main>
    </div>
  );
}
