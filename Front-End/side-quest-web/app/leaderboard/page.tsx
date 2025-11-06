
import React from "react";

// Character option types (copied from character-creator)
type Option = { label: string; sprite: string };

const Base: Option[] = [
        { label: "None", sprite: "/sprites/BaseCharacter/Yellow_Man.png" },
        { label: "American", sprite: "/sprites/American/American_Full.png" },
        { label: "German", sprite: "/sprites/German/German_Full.png" },
        { label: "Mariachi", sprite: "/sprites/Mariachi/Mariachi_Full.png" },
        { label: "Samurai", sprite: "/sprites/Samurai/Samurai_Full.png" },
];
const Hats: Option[] = [
        { label: "None", sprite: "" },
        { label: "German Hat", sprite: "/sprites/German/german-hat.png" },
        { label: "Mariachi Hat", sprite: "/sprites/Mariachi/Mariachi_Hat.png" },
        { label: "Samurai Helmet", sprite: "/sprites/Samurai/Samurai_helmet.png" },
        { label: "American Mustache", sprite: "/sprites/American/Shane_Gillis.png" }
];
const Shirts: Option[] = [
        { label: "None", sprite: "" },
        { label: "German Shirt", sprite: "/sprites/German/german-shirt.png" },
        { label: "Mariachi Shirt", sprite: "/sprites/Mariachi/Mariachi_Shirt.png" },
        { label: "Samurai Armor", sprite: "/sprites/Samurai/Samurai_Armor.png" },
        { label: "American Shirt", sprite: "/sprites/American/Valley_Forge.png" },
];
const Pants: Option[] = [
        { label: "None", sprite: "" },
        { label: "German Pants", sprite: "/sprites/German/german-pants.png" },
        { label: "American Jeans", sprite: "/sprites/American/Jeans.png" },
        { label: "Mariachi Pants", sprite: "/sprites/Mariachi/Mariachi_Pants.png" },
        { label: "Samurai Waist", sprite: "/sprites/Samurai/Samurai_Waist.png" },
];
const Shoes: Option[] = [
        { label: "None", sprite: "" },
        { label: "German Shoes", sprite: "/sprites/German/german-shoes.png" },
        { label: "American Boots", sprite: "/sprites/American/Boots.png" },
        { label: "Mariachi Boots", sprite: "/sprites/Mariachi/Mariachi_Boots.png" },
        { label: "Samurai Boots", sprite: "/sprites/Samurai/Samurai_Boots.png" },
];

// Mock leaderboard data
// Mock leaderboard data (limited to 8 entries)
const combinedLeaderboardData = [
    { name: 'Ivan', time: 33.5, character: { base: 2, hat: 0, shirt: 0, pants: 2, shoes: 0 } },
    { name: 'Alice', time: 42.1, character: { base: 1, hat: 4, shirt: 4, pants: 2, shoes: 2 } },
    { name: 'Bob', time: 44.5, character: { base: 2, hat: 1, shirt: 1, pants: 1, shoes: 1 } },
    { name: 'You', time: 45.0, character: { base: 4, hat: 3, shirt: 3, pants: 4, shoes: 4 } },
    { name: 'Mia', time: 49.4, character: { base: 2, hat: 3, shirt: 2, pants: 2, shoes: 1 } },
    { name: 'Olivia', time: 53.2, character: { base: 4, hat: 4, shirt: 1, pants: 0, shoes: 2 } },
    { name: 'Leo', time: 66.6, character: { base: 1, hat: 2, shirt: 3, pants: 1, shoes: 2 } },
    { name: 'Frank', time: 78.4, character: { base: 3, hat: 1, shirt: 3, pants: 3, shoes: 3 } },
];

// Sort by time ascending
const sortedLeaderboard = [...combinedLeaderboardData].sort((a, b) => a.time - b.time);

// Find current player
const currentPlayerName = "You";
const currentPlayerIndex = sortedLeaderboard.findIndex((p) => p.name === currentPlayerName);
const topPlayer = sortedLeaderboard[0];

function CharacterDisplay({ character, size = "w-36 h-36" }: { character: { base: number; hat: number; shirt: number; pants: number; shoes: number }, size?: string }) {
    return (
        <div className={`relative rounded-xl bg-gray-200 mx-auto ${size} flex items-center justify-center`}>
            {Base[character.base]?.sprite && (
                <img src={Base[character.base].sprite} alt={Base[character.base].label} className="absolute h-full w-full object-contain" />
            )}
            {Pants[character.pants]?.sprite && (
                <img src={Pants[character.pants].sprite} alt={Pants[character.pants].label} className="absolute h-full w-full object-contain" />
            )}
            {Shirts[character.shirt]?.sprite && (
                <img src={Shirts[character.shirt].sprite} alt={Shirts[character.shirt].label} className="absolute h-full w-full object-contain" />
            )}
            {Shoes[character.shoes]?.sprite && (
                <img src={Shoes[character.shoes].sprite} alt={Shoes[character.shoes].label} className="absolute h-full w-full object-contain" />
            )}
            {Hats[character.hat]?.sprite && (
                <img src={Hats[character.hat].sprite} alt={Hats[character.hat].label} className="absolute h-full w-full object-contain" />
            )}
        </div>
    );
}

export default function LeaderboardPage() {
    // Helper to format seconds into minutes and mm:ss
    function formatTime(seconds: number) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.round(seconds % 60);
        const mmss = `${mins}:${secs.toString().padStart(2, "0")}`;
        const minutesDecimal = (seconds / 60).toFixed(2);
        return { mmss, minutesDecimal };
    }

    return (
        <section className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

            <div className="flex gap-6">
                {/* Left side: two large cards side-by-side */}
                <div className="flex-1 flex gap-6">
                    <div className="flex-1 rounded-xl bg-gray-300 p-6 shadow-lg flex flex-col items-center justify-center h-96">
                        <div className="text-lg text-gray-700 mb-4">Character Photo</div>
                        {/* center a smaller character inside a tall card */}
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <CharacterDisplay character={sortedLeaderboard[currentPlayerIndex].character} size="w-40 h-40" />
                        </div>
                        <div className="mt-3 font-semibold">{sortedLeaderboard[currentPlayerIndex].name}</div>
                        <div className="text-sm text-gray-600">Rank: {currentPlayerIndex + 1} / {sortedLeaderboard.length}</div>
                        <div className="text-sm text-gray-600">{formatTime(sortedLeaderboard[currentPlayerIndex].time).minutesDecimal} min ({formatTime(sortedLeaderboard[currentPlayerIndex].time).mmss})</div>
                    </div>

                    <div className="flex-1 rounded-xl bg-gray-300 p-6 shadow-lg flex flex-col items-center justify-center h-96">
                        <div className="text-lg text-gray-700 mb-4">Top Player's Character</div>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <CharacterDisplay character={topPlayer.character} size="w-40 h-40" />
                        </div>
                        <div className="mt-3 font-semibold">{topPlayer.name}</div>
                        <div className="text-sm text-gray-600">{formatTime(topPlayer.time).minutesDecimal} min ({formatTime(topPlayer.time).mmss})</div>
                    </div>
                </div>

                {/* Right side: tall leaderboard panel */}
                <div className="w-80 rounded-xl bg-gray-400 p-6 shadow-lg h-96 overflow-y-auto">
                    <div className="text-center text-white font-semibold mb-6">Leaderboard</div>
                    <ol className="space-y-6">
                        {sortedLeaderboard.map((entry, idx) => (
                            <li key={entry.name} className={`flex items-center gap-4 p-2 rounded ${idx === 0 ? 'bg-yellow-200' : entry.name === currentPlayerName ? 'bg-blue-200' : 'bg-gray-200'}`}>
                                <div className="w-10 text-2xl font-bold text-center">{idx + 1}.</div>
                                <div className="w-16"> <CharacterDisplay character={entry.character} size="w-16 h-16" /> </div>
                                <div className="flex-1"> <div className="font-semibold">{entry.name}</div> <div className="text-sm text-gray-600">{formatTime(entry.time).mmss}</div> </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}