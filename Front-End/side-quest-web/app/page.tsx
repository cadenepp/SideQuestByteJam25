"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[url('/background/bgMain.png')] bg-cover bg-center text-white"
    >
      {/* semi-dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* main content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* logo */}
        <img
          src="/sprites/logoSideQuest.png"
          alt="Logo Side Quest"
          className="w-[800px] max-w-[80vw] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
        />

        {/* buttons */}
        <div className="flex flex-col gap-4 w-[260px]">
          <button
            onClick={() => router.push("/character-creator")}
            className="w-full rounded-md bg-[#6ea34d] px-6 py-3 text-lg font-bold uppercase tracking-wide text-black shadow-[0_4px_0_#3c5e25] hover:translate-y-[2px] hover:shadow-[0_2px_0_#3c5e25] active:translate-y-[3px] active:shadow-none transition-all duration-100"
          >
            Start Character Creation
          </button>

          <button
            onClick={() => router.push("/about")}
            className="w-full rounded-md bg-[#d9b63a] px-6 py-3 text-lg font-bold uppercase tracking-wide text-black shadow-[0_4px_0_#7b6519] hover:translate-y-[2px] hover:shadow-[0_2px_0_#7b6519] active:translate-y-[3px] active:shadow-none transition-all duration-100"
          >
            About
          </button>
          <button
            onClick={() => router.push("/leaderboard")}
            className="w-full rounded-md bg-blue-600 px-6 py-3 text-lg font-bold uppercase tracking-wide text-black shadow-[0_4px_0_#1447e6] hover:translate-y-[2px] hover:shadow-[0_2px_0_#193cb8] active:translate-y-[3px] active:shadow-none transition-all duration-100"
          >
            Leaderboard
          </button>
        </div>
      </div>
    </main>
  );
}
