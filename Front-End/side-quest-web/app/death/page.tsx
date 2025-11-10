"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Death() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Store query params in state to ensure they are stable
  const [params, setParams] = useState<{
    sessionId: string | null;
    userId: number | null;
    timer: number | null;
  }>({ sessionId: null, userId: null, timer: null });

  useEffect(() => {
    if (params.sessionId && params.userId !== null && params.timer !== null) return; // already set

    const sessionId = searchParams.get("sessionId");
    const userIdParam = searchParams.get("userId");
    const timerParam = searchParams.get("timer");

    const userId = userIdParam ? Number(userIdParam) : null;
    const timer = timerParam ? Number(timerParam) : null;

    setParams({ sessionId, userId, timer });
  }, [searchParams]);

  useEffect(() => {
    // Only send if all params are valid
    if (!params.sessionId || params.userId === null || params.timer === null) return;

    const sendDeathData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/quest/die/${params.userId}/${params.timer}/${params.sessionId}`,
          { method: "POST" }
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        console.log("Death data sent successfully!");
      } catch (err) {
        console.error("Error sending death data:", err);
      }
    };

    sendDeathData();
  }, [params]); // only runs once when params are set

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/background/OtherDeathScreen2.png)" }}
    >
      <div className="bg-black/60 text-white p-10 rounded-2xl text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">You Have Fallen</h1>
        <p className="text-lg mb-8">
          Your journey has ended... but perhaps this is not the last time you'll walk these lands.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-300 text-black px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition"
        >
          Back to Start
        </button>
      </div>
    </section>
  );
}
