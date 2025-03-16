"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <section className="bg-silo-navy text-white pt-10 pb-32 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        {/* AI Pill Badge */}
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 inline-flex items-center">
          <span className="text-white/80 text-sm">Powered by AI</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
          The fastest way to onboard developers
        </h1>

        {/* Search Box */}
        <div className="w-full max-w-xl mx-auto mb-10 relative">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-1">
            <div className="flex items-center space-x-2 p-2">
              <input
                type="text"
                placeholder="Ask Silo Team to onboard a Python & Django Developer..."
                className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-white/60 py-2 px-3"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-1 bg-black/30 px-2 py-1 rounded">
                  <span className="text-xs text-white/80">
                    Engineering Manager
                  </span>
                  <span className="text-white/60">▾</span>
                </div>
                <div className="flex items-center space-x-1 bg-black/30 px-2 py-1 rounded">
                  <span className="text-xs text-white/80">Backend</span>
                  <span className="text-white/60">▾</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-3 pb-3">
              <div className="flex items-center space-x-1 bg-black/30 px-2 py-1 rounded">
                <span className="text-xs text-white/80">Engineer</span>
                <span className="text-white/60">▾</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/30 px-2 py-1 rounded">
                <span className="text-xs text-white/80">Stakeholders</span>
                <span className="text-white/60">▾</span>
              </div>
              <div className="ml-auto">
                <Button className="bg-silo-blue hover:bg-silo-blue/90 text-white rounded-md px-4 py-2 w-full text-sm">
                  Build a Plan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video/App Demo Section */}
        <div className="relative w-full max-w-5xl mx-auto mb-12">
          <div className="aspect-video bg-black/20 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/hero-animation.gif"
              alt="Silo Team Demo Animation"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="text-left">
            <h3 className="text-xl font-bold mb-2">Faster Onboarding</h3>
            <p className="text-white/80">Shortens the time to productivity.</p>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold mb-2">AI-Powered Templates</h3>
            <p className="text-white/80">
              Create tailored onboarding plans instantly with AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
