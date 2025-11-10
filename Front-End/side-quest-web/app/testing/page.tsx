"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SlideResponse {
  text: string;
  choiceOne: string;
  answerOne: number;
  choiceTwo: string;
  answerTwo: number;
}

export default function Testing() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const router = useRouter();

  const [slideData, setSlideData] = useState<SlideResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  useEffect(() => {
    const fetchSlide = async () => {
      if (!sessionId) {
        console.error("No sessionId found in URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/quest/slide1/${encodeURIComponent(sessionId)}`
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data: SlideResponse = await response.json();
        setSlideData(data);
      } catch (err) {
        console.error("Error fetching slide:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlide();
  }, [sessionId]);

  const handleChoice = (answer: number) => {
    setSelectedChoice(answer);

    if (answer === 0) {
      // ❌ Wrong choice → go to death screen with sessionId
      router.push(`/death?sessionId=${encodeURIComponent(sessionId || "")}`);
    } else {
      // ✅ Correct choice → continue journey (for now, show message)
      alert("Correct! Advancing to next slide...");
      // Example next step:
      // router.push(`/slide2?sessionId=${encodeURIComponent(sessionId || "")}`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="italic text-gray-700">Loading quest...</span>
      </main>
    );
  }

  if (!slideData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">No data found for this session.</p>
      </main>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-between bg-gray-100 py-10 px-6">
      {/* Top story text box */}
      <div className="w-full max-w-4xl">
        <div className="rounded-3xl bg-gray-400 text-gray-900 shadow-lg py-10 px-8 text-center min-h-24 flex items-center justify-center">
          <p className="max-w-3xl text-lg font-medium">{slideData.text}</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Choices */}
      <div className="w-full max-w-3xl flex flex-col gap-6 items-center mb-12">
        <button
          onClick={() => handleChoice(slideData.answerOne)}
          className={`w-3/4 md:w-2/3 py-4 rounded-full text-gray-900 shadow-lg transition 
            ${
              selectedChoice === slideData.answerOne
                ? "bg-green-300"
                : "bg-gray-300 hover:bg-gray-200"
            }`}
        >
          {slideData.choiceOne}
        </button>

        <button
          onClick={() => handleChoice(slideData.answerTwo)}
          className={`w-3/4 md:w-2/3 py-4 rounded-full text-gray-900 shadow-lg transition 
            ${
              selectedChoice === slideData.answerTwo
                ? "bg-green-300"
                : "bg-gray-300 hover:bg-gray-200"
            }`}
        >
          {slideData.choiceTwo}
        </button>
      </div>
    </section>
  );
}
