"use client";

import { useEffect, useState } from "react";

function fakeAIGenerate(name?: string) {
    const intros = [
        "A whisper of destiny calls",
        "The wind carries a promise",
        "From the tavern's shadow a voice says",
        "An old map burned at the edges reveals",
    ];

    const quests = [
        "retrieve the lost amulet of Verdin from the Hollow Cave.",
        "escort the caravan through the night-blighted pass.",
        "bring peace between the riverfolk and the mountain clans.",
        "uncover the secret behind the falling stars.",
    ];

    const hooks = [
        "You will be tested, but glory waits for the brave.",
        "The path will ask much, and give more in return.",
        "Trust the stranger with a crooked grin; they know the way.",
        "This choice decides more than a single life.",
    ];

    const intro = intros[Math.floor(Math.random() * intros.length)];
    const quest = quests[Math.floor(Math.random() * quests.length)];
    const hook = hooks[Math.floor(Math.random() * hooks.length)];

    const who = name ? `${name},` : "Traveler,";

    // return a short monologue sentence
    return `${intro}: ${who} ${quest} ${hook}`;
}

export default function MonologuePage() {
    const [monologue, setMonologue] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [acknowledged, setAcknowledged] = useState(false);

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => {
            setMonologue(fakeAIGenerate());
            setLoading(false);
        }, 700);
        return () => clearTimeout(t);
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
            {/* Top-centered rounded dialog pill */}
            <div className="w-full max-w-4xl">
                <div className="mx-auto">
                    <div className="rounded-full bg-gray-400 text-gray-900 shadow-lg py-10 px-8 text-center min-h-[6rem] flex items-center justify-center">
                        {loading ? (
                            <span className="italic">Generating monologue…</span>
                        ) : (
                            <p className="max-w-3xl">{monologue}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Spacer to push the button lower — matches the layout in the image */}
            <div className="flex-1" />

            {/* Centered rounded button near bottom */}
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

            {/* Optional acknowledgement text under the button */}
            {acknowledged && (
                <div className="mt-6 text-center text-gray-700">You acknowledged the quest — good luck!</div>
            )}
        </main>
    );
}