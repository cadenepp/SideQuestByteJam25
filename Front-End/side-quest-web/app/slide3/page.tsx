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

interface UserData {
  id: number;
  name: string;
  overallCulture: string;
  hat: string;
  shirt: string;
  pants: string;
  shoes: string;
}

export default function Testing() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const router = useRouter();

  const [seconds, setSeconds] = useState<number>(() => {
    // 🕒 Resume timer from localStorage
    const stored = localStorage.getItem("elapsedTime");
    return stored ? parseInt(stored, 10) : 0;
  });

  const [userId, setUserId] = useState<number | null>(null);  
  const [slideData, setSlideData] = useState<SlideResponse | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 🕒 Timer logic (resumes and updates localStorage)
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

  // 👤 Fetch user data from localStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedId = localStorage.getItem("userId");
        if (!storedId) return;

        const parsedId = Number(storedId);
        if (isNaN(parsedId)) return;

        setUserId(parsedId);

        const res = await fetch(`http://localhost:8080/api/User/${parsedId}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data: UserData = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // 🎯 Fetch current quest slide
  useEffect(() => {
    const fetchSlide = async () => {
      if (!sessionId) return setLoading(false);

      try {
        const response = await fetch(
          `http://localhost:8080/api/quest/slide3/${encodeURIComponent(sessionId)}`
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

  // 🧭 Handle choice
  const handleChoice = (answer: number) => {
    const stoppedTime = seconds;

    if (answer === 0) {
      // Death path
      localStorage.removeItem("elapsedTime");
      router.push(
        `/death?sessionId=${encodeURIComponent(sessionId || "")}&userId=${userId}&timer=${stoppedTime}`
      );
    } else {
      router.push(`/slide4?sessionId=${encodeURIComponent(sessionId || "")}`);
    }
  };

  if (loading || !slideData || !userData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <span className="italic text-gray-700 text-xl">Loading quest...</span>
      </main>
    );
  }

  const culture = userData.overallCulture;
  const backgroundPath = `/background/${culture}Background.png`;
  const hatPath = `/sprites/${userData.hat}.png`;
  const shirtPath = `/sprites/${userData.shirt}.png`;
  const pantsPath = `/sprites/${userData.pants}.png`;
  const shoesPath = `/sprites/${userData.shoes}.png`;

  return (
    <main className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className="relative w-full max-w-7xl bg-linear-to-br from-gray-200 to-gray-300 rounded-3xl shadow-2xl p-8">
        
        {/* Exit Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute right-8 top-8 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-red-400 transition"
        >
          Exit to Menu
        </button>

        {/* Timer */}
        <div className="absolute left-8 top-8 flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md text-lg font-semibold">
          🕒 {mm}:{ss}
        </div>

        {/* Character + Story */}
        <div className="mt-16 flex flex-col lg:flex-row gap-12 items-center">
          {/* Character Display */}
          <div className="flex justify-center w-full lg:w-1/2">
            <div className="relative w-full max-w-md aspect-square rounded-2xl border border-black shadow-xl overflow-hidden">
              <img src={backgroundPath} alt={culture} className="absolute h-full w-full object-cover" />
              <img src="/sprites/BaseCharacter/Yellow_Man.png" alt="Base" className="absolute h-full w-full object-contain" />
              <img src={pantsPath} alt="Pants" className="absolute h-full w-full object-contain" />
              <img src={shirtPath} alt="Shirt" className="absolute h-full w-full object-contain" />
              <img src={shoesPath} alt="Shoes" className="absolute h-full w-full object-contain" />
              <img src={hatPath} alt="Hat" className="absolute h-full w-full object-contain" />
            </div>
          </div>

          {/* Story Box */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-3xl p-8 bg-white shadow-2xl border border-gray-400 min-h-96 flex items-center justify-center">
              <p className="text-center text-2xl font-medium">{slideData.text}</p>
            </div>
          </div>
        </div>

        {/* Choices */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center">
          <button
            onClick={() => handleChoice(slideData.answerOne)}
            className="flex-1 bg-blue-500 text-white text-2xl py-4 rounded-2xl shadow-lg hover:bg-blue-400 transition font-semibold"
          >
            {slideData.choiceOne}
          </button>
          <button
            onClick={() => handleChoice(slideData.answerTwo)}
            className="flex-1 bg-green-500 text-white text-2xl py-4 rounded-2xl shadow-lg hover:bg-green-400 transition font-semibold"
          >
            {slideData.choiceTwo}
          </button>
        </div>
      </div>
    </main>
  );
}
