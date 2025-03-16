"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-4 md:px-8 bg-transparent">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-8 font-semibold text-white font-pt-sans flex items-center">
            <h1>ATOM</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#wall-of-love"
            className="text-white/90 hover:text-white transition-colors"
          >
            Wall of love
          </Link>
          <Link
            href="https://calendly.com/d/ckxz-bg4-nn2/silo-team-quick-demo"
            className="text-white/90 hover:text-white transition-colors"
            target="_blank"
          >
            Book a demo
          </Link>
          <Link
            href="#how-it-works"
            className="text-white/90 hover:text-white transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/about-us"
            className="text-white/90 hover:text-white transition-colors"
          >
            About
          </Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="rounded-md bg-white/10 text-white border-white/20 hover:bg-white/15 hover:text-white"
          >
            Log in
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-silo-navy p-4 flex flex-col space-y-4 md:hidden z-50">
          <Link
            href="#wall-of-love"
            className="text-white/90 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Wall of love
          </Link>
          <Link
            href="https://calendly.com/d/ckxz-bg4-nn2/silo-team-quick-demo"
            className="text-white/90 hover:text-white transition-colors py-2"
            target="_blank"
            onClick={() => setIsMenuOpen(false)}
          >
            Book a demo
          </Link>
          <Link
            href="#how-it-works"
            className="text-white/90 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            How it works
          </Link>
          <Link
            href="/about-us"
            className="text-white/90 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Button
            variant="outline"
            className="w-full rounded-md bg-white/10 text-white border-white/20 hover:bg-white/15 hover:text-white"
          >
            Log in
          </Button>
        </div>
      )}
    </nav>
  );
}
