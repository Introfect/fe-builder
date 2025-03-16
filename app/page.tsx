"use client";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [pageName, setPageName] = useState("");
  const [status, setStatus] = useState("");

  const handleCreatePage = async () => {
    if (!pageName.trim()) return setStatus("Please enter a page name.");

    const response = await fetch("/api/generate-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageName }),
    });

    const data = await response.json();
    if (response.ok) {
      setStatus(`Page created! Visit: ${data.route}`);
    } else {
      setStatus(`Error: ${data.error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <Navbar />
      <Hero />
      <h1 className="text-2xl font-semibold mb-4">Create a New Page</h1>
      <input
        type="text"
        placeholder="Enter Page Name"
        value={pageName}
        onChange={(e) => setPageName(e.target.value)}
        className="border px-4 py-2 rounded-md shadow-sm mb-2"
      />
      <button
        onClick={handleCreatePage}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Generate Page
      </button>
      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </div>
  );
}
