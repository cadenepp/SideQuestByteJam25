"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function MonologuePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [monologue, setMonologue] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [background, setBackground] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const fetchMonologue = async () => {
      if (!sessionId) {
        console.error("No sessionId found in URL.");
        setMonologue("Session not found. Please restart your journey.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
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

          // ** save for next slides **
          localStorage.setItem("userId", userIdStr);
          localStorage.setItem("background", overallCulture);

          console.log("Monologue:", text);
          console.log("User ID:", userIdStr);
          console.log("Background:", overallCulture);
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

  // dynamically set background image path
  const backgroundImagePath = background ? `/background/${background}Background.png` : "";

  return (
    <main
      className="min-h-screen flex flex-col items-center py-12 px-6"
      style={{
        backgroundImage: backgroundImagePath ? `url(${backgroundImagePath})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="mx-auto">
          <div className="rounded-full bg-gray-400 text-gray-900 shadow-lg py-10 px-8 text-center min-h-[6rem] flex items-center justify-center">
            {loading ? <span className="italic">Generating monologue…</span> : <p className="max-w-3xl">{monologue}</p>}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="w-full max-w-xl">
        <div className="mx-auto flex justify-center">
          <button
            type="button"
            onClick={() => setAcknowledged(true)}
            className="w-1/2 md:w-1/3 bg-gray-400 text-gray-900 rounded-2xl py-4 shadow-lg hover:bg-gray-300"
          >
            {acknowledged ? "Quest Understood!" : "Quest Understood"}
          </button>
        </div>
      </div>

      {acknowledged && (
        <div className="mt-6 text-center text-gray-700">
          You acknowledged the quest — good luck, {background} adventurer!
        </div>
      )}
    </main>
  );
}
