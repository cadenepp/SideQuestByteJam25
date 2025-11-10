"use client";

import { useEffect, useState } from "react";

type StoredCharacter = {
    name: string;
    background: string;
    hat: string;
    shirt: string;
    pants: string;
    shoes: string;
};

export default function slide2() {
    const [seconds, setSeconds] = useState(0);
    const [character, setCharacter] = useState<StoredCharacter | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("character");
            if (raw) setCharacter(JSON.parse(raw) as StoredCharacter);
        } catch {

        }
    }, []);

    useEffect(() => {
        const t = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");


    return (
        <main className="p-6">
            <div className="relative rounded-3xl bg-gray-300 p-6 shadow">

                <button
                    type="button"
                    onClick={() => (window.location.href = "/")}
                    className="absolute right-6 top-6 rounded-xl border border-black bg-gray-400 px-4 py-2 text-lg shadow hover:bg-gray-300"
                >
                    Exit to Menu
                </button>

                <div className="absolute left-6 top-6 flex items-center">
                    <p className="text-2xl ">🕒</p>
                    <p className="font-medium ">
                        {mm}:{ss}
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-center">
                        <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-black shadow-lg">
                            {character?.background ? (
                                <img
                                    src={character.background}
                                    alt={character.background}
                                    className="absolute h-full w-full object-cover"
                                />
                            ) : (
                                <div className="absolute h-full w-full bg-gray-200"/>
                            )}

                            <img
                                src="/sprites/BaseCharacter/Yellow_Man.png"
                                alt="Base"
                                className="absolute h-full w-full object-contain"
                            />

                            {character?.pants && (
                                <img
                                    src={character.pants}
                                    alt={character.pants}
                                    className="absolute h-full w-full object-contain"
                                />
                            )}
                            {character?.shirt && (
                                <img
                                    src={character.shirt}
                                    alt={character.shirt}
                                    className="absolute h-full w-full object-contain"
                                />
                            )}
                            {character?.shoes && (
                                <img
                                    src={character.shoes}
                                    alt={character.shoes}
                                    className="absolute h-full w-full object-contain"
                                />
                            )}
                            {character?.hat && (
                                <img
                                    src={character.hat}
                                    alt={character.hat}
                                    className="absolute h-full w-full object-contain"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="min-h-[18rem] w-full rounded-2xl border border-black bg-gray-100 p-6 shadow-xl">
                            <p className="text-center text-lg">
                                Welcome!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-8 grid max-w-3xl gap-6 md:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/slide3")}
                        className="w-full rounded-xl border border-black bg-gray-400 px-6 py-3 text-lg shadow hover:bg-gray-300"
                    >
                        User dialog choice 1
                    </button>
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/slide3")}
                        className="w-full rounded-xl border border-black bg-gray-400 px-6 py-3 text-lg shadow hover:bg-gray-300"
                    >
                        User dialog choice 2
                    </button>
                </div>
            </div>
        </main>
    );
}