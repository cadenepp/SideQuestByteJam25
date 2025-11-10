"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  name: string;
  overallCulture: string;
  hat: string;
  shirt: string;
  pants: string;
  shoes: string;
}

interface SuccessfulUser {
  userId: number;
  timeInSeconds: number;
  sessionId: string;
}

interface LeaderboardEntry {
  user: UserData;
  time: number;
}

// Character display component
function CharacterDisplay({ character, size = "w-36 h-36" }: { character: UserData; size?: string }) {
  return (
    <div className={`relative rounded-xl bg-gray-200 ${size} flex items-center justify-center shadow-inner`}>
      <img src="/sprites/BaseCharacter/Yellow_Man.png" alt="Base" className="absolute h-full w-full object-contain" />
      {character.pants && <img src={`/sprites/${character.pants}.png`} alt={character.pants} className="absolute h-full w-full object-contain" />}
      {character.shirt && <img src={`/sprites/${character.shirt}.png`} alt={character.shirt} className="absolute h-full w-full object-contain" />}
      {character.shoes && <img src={`/sprites/${character.shoes}.png`} alt={character.shoes} className="absolute h-full w-full object-contain" />}
      {character.hat && <img src={`/sprites/${character.hat}.png`} alt={character.hat} className="absolute h-full w-full object-contain" />}
    </div>
  );
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/SuccessfulUser");
        const successfulUsers: SuccessfulUser[] = await res.json();

        const userDataPromises = successfulUsers.map(async (su) => {
          const userRes = await fetch(`http://localhost:8080/api/User/${su.userId}`);
          const user: UserData = await userRes.json();
          return { user, time: su.timeInSeconds };
        });

        const leaderboardData = await Promise.all(userDataPromises);
        leaderboardData.sort((a, b) => a.time - b.time);

        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <span className="italic text-gray-700 text-xl">Loading leaderboard...</span>
      </main>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-8 relative">
      {/* Back to Home Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 right-6 bg-gray-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-600 transition"
      >
        ← Home
      </button>

      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">🏆 Leaderboard</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: top player */}
        {leaderboard[0] && (
          <div className="flex-1 rounded-3xl bg-linear-to-br from-yellow-400 to-yellow-300 p-8 shadow-2xl flex flex-col items-center justify-center min-h-112">
            <div className="text-2xl md:text-3xl text-gray-800 font-semibold mb-6">Top Player's Character</div>
            <div className="bg-white p-8 rounded-2xl shadow-inner mb-6">
              <CharacterDisplay character={leaderboard[0].user} size="w-52 h-52" />
            </div>
            <div className="text-3xl font-bold">{leaderboard[0].user.name}</div>
            <div className="text-xl text-gray-700 mt-2">{(leaderboard[0].time / 60).toFixed(2)} min</div>
          </div>
        )}

        {/* Right side: leaderboard panel */}
        <div className="lg:w-96 rounded-3xl bg-gray-800 p-6 shadow-2xl overflow-y-auto h-128">
          <div className="text-center text-2xl font-bold text-white mb-8">All Players</div>
          <ol className="space-y-6">
            {leaderboard.map((entry, idx) => (
              <li
                key={entry.user.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                  idx === 0 ? "bg-yellow-400 shadow-lg" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <div className="w-12 text-3xl font-extrabold text-center">{idx + 1}.</div>
                <div className="w-20">
                  <CharacterDisplay character={entry.user} size="w-20 h-20" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-lg">{entry.user.name}</div>
                  <div className="text-gray-200 text-sm">{Math.round(entry.time)} sec</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
