"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function MonologuePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("sessionId");

  const [monologue, setMonologue] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [background, setBackground] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [acknowledged, setAcknowledged] = useState(false);

  // 🕒 Timer
  const [seconds, setSeconds] = useState<number>(() => {
    const stored = localStorage.getItem("elapsedTime");
    return stored ? parseInt(stored, 10) : 0;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        const newTime = prev + 1;
        localStorage.setItem("elapsedTime", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  // 🎯 Fetch monologue
  useEffect(() => {
    const fetchMonologue = async () => {
      if (!sessionId) {
        console.error("No sessionId found in URL.");
        setMonologue("Session not found. Please restart your journey.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/quest/monologue/${encodeURIComponent(sessionId)}`
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (Array.isArray(data) && data.length >= 3) {
          const [text, userIdStr, overallCulture] = data;

          setMonologue(text);
          setUserId(Number(userIdStr));
          setBackground(overallCulture);

          localStorage.setItem("userId", userIdStr);
          localStorage.setItem("background", overallCulture);
        } else {
          console.error("Unexpected response format:", data);
          setMonologue("Unexpected data format from server.");
        }
      } catch (err) {
        console.error("Error fetching monologue:", err);
        setMonologue("Failed to load monologue. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonologue();
  }, [sessionId]);

  const backgroundImagePath = background ? `/background/${background}Background.png` : "";

  // ⚙️ Handle "Quest Understood"
  const handleAcknowledge = () => {
    setAcknowledged(true);
    localStorage.setItem("elapsedTime", seconds.toString());
    setTimeout(() => {
      if (sessionId) {
        router.push(`/slide1?sessionId=${encodeURIComponent(sessionId)}`);
      } else {
        console.error("No sessionId found for navigation.");
      }
    }, 800);
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-between py-12 px-6 relative text-gray-100"
      style={{
        backgroundImage: backgroundImagePath ? `url(${backgroundImagePath})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* 🕒 Timer */}
      <p className="absolute top-8 right-8 z-10 text-2xl font-bold text-white shadow-lg">
        🕒 {mm}:{ss}
      </p>

      {/* 🗣️ Monologue Box */}
      <div className="relative z-10 w-full max-w-5xl mt-24">
        <div className="mx-auto bg-white/90 text-gray-900 rounded-3xl shadow-2xl py-16 px-12 text-center min-h-96 flex items-center justify-center">
          {loading ? (
            <span className="italic text-xl">Generating monologue…</span>
          ) : (
            <p className="text-2xl md:text-3xl leading-relaxed">{monologue}</p>
          )}
        </div>
      </div>

      {/* ✅ Acknowledge Button */}
      <div className="relative z-10 w-full max-w-xl mt-12 mb-12 flex justify-center">
        <button
          type="button"
          onClick={handleAcknowledge}
          className="w-2/3 md:w-1/3 bg-linear-to-r from-green-500 to-green-600 text-white text-2xl font-bold py-5 rounded-3xl shadow-xl hover:from-green-600 hover:to-green-700 transition-all"
        >
          {acknowledged ? "Quest Understood!" : "Quest Understood"}
        </button>
      </div>

      {acknowledged && (
        <div className="relative z-10 mb-12 text-center text-xl md:text-2xl text-white font-semibold shadow-md">
          You acknowledged the quest — good luck, {background} adventurer!
        </div>
      )}
    </main>
  );
}
