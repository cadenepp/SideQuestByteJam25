"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Option = { label: string; sprite: string };

const Background: Option[] = [
    { label: "America", sprite: "/sprites/backgrounds/AmericanBackground.png" },
    { label: "Japan", sprite: "/sprites/backgrounds/JapanBackground.png" },
    { label: "Mexico", sprite: "/sprites/backgrounds/MexicoBackground.png" },
    { label: "Germany", sprite: "/sprites/backgrounds/OktoberfestBackground.png" },
];

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

function Chevron({direction, onClick}: {
    direction: "left" | "right";
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="h-8 w-8 rounded-md border border-black/10 bg-gray-400 hover:bg-gray-100 active:translate-y-px"
        >
            {direction === "left" ? "◄" : "►"}
        </button>
    );
}

//A row component for the label and choice selection 
function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center rounded-lg border border-black bg-gray-300 px-3 py-2">
            <div className="w-30">{label}</div>
            <div className="flex-1">{children}</div>
        </div>
    );
}

export default function CharacterCreatorPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [hatId, setHatId] = useState(0);
    const [shirtId, setShirtId] = useState(0);
    const [pantsId, setPantsId] = useState(0);
    const [shoesId, setShoesId] = useState(0);
    const [backgroundId, setBackgroundId] = useState(0);
    const [baseId, setBaseId] = useState(0);

    function getSelections() {
        return {
            hat: Hats[hatId],
            shirt: Shirts[shirtId],
            pants: Pants[pantsId],
            shoes: Shoes[shoesId],
            background: Background[backgroundId],
            base: Base[baseId],
        };
    }

    const selections = getSelections();

    //Cycle function for clothing and background
    function cycle(items: number, index: number, direction: -1 | 1) {
        let next = index + direction;
        if (next < 0) next = items - 1;
        if (next >= items) next = 0;
        return next;
    }

    const handleStartJourney = () => {
        const params = new URLSearchParams({
            name,
            bg: String(backgroundId),
            base: String(baseId),
            hat: String(hatId),
            shirt: String(shirtId),
            pants: String(pantsId),
            shoes: String(shoesId),
        });
        router.push(`/monologue?${params.toString()}`);
    };

    return (
        //TODO display the background image
        <main className="p-6">
            <div>
                <div className="mb-6">
                    <h1 className="rounded-3xl bg-gray-400 py-4 text-center text-2xl font-semibold shadow">
                        Character Creation
                    </h1>
                </div>

                {/*//TODO add better shadows*/}
                <div className="rounded-3xl bg-gray-300 p-6 shadow">
                    {/*//TODO fix the buttons from going outside the div*/}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* left side character display */}
                        <div className="flex items-center justify-center">
                            <div
                                className="relative aspect-square w-full rounded-xl bg-gray-200 shadow-lg">
                                {selections.base.sprite && (
                                    <img src={selections.base.sprite} alt={selections.base.label}
                                         className="absolute h-full w-full object-contain"/>
                                )}
                                {selections.pants.sprite && (
                                    <img src={selections.pants.sprite} alt={selections.pants.label}
                                         className="absolute h-full w-full object-contain"/>
                                )}
                                {selections.shirt.sprite && (
                                    <img src={selections.shirt.sprite} alt={selections.shirt.label}
                                         className="absolute h-full w-full object-contain"/>
                                )}
                                {selections.shoes.sprite && (
                                    <img src={selections.shoes.sprite} alt={selections.shoes.label}
                                         className="absolute h-full w-full object-contain"/>
                                )}
                                {selections.hat.sprite && (
                                    <img src={selections.hat.sprite} alt={selections.hat.label}
                                         className="absolute h-full w-full object-contain"/>
                                )}
                            </div>
                        </div>

                        {/* right side creation div */}
                        <div className="rounded-2xl border border-black bg-gray-500 p-4 shadow-xl">
                            <div className="space-y-3">
                                <Row label="Name:">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="max-w rounded-md bg-gray-100 px-3 py-2 shadow-md"
                                    />
                                </Row>

                                <Row label="Base:">
                                    <div className="flex items-center gap-2">
                                        <Chevron direction="left"
                                                 onClick={() => setBaseId((i) => cycle(Base.length, i, -1))}/>
                                        <div
                                            className="flex-1 w-40 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-md">
                                            {Base[baseId].label} ({baseId + 1}/{Base.length})
                                        </div>
                                        <Chevron direction="right"
                                                 onClick={() => setBaseId((i) => cycle(Base.length, i, +1 as 1))}/>
                                    </div>
                                </Row>

                                <Row label="Hat:">
                                    <div className="flex items-center gap-2">
                                        <Chevron direction="left"
                                                 onClick={() => setHatId((i) => cycle(Hats.length, i, -1))}/>
                                        <div
                                            className="flex-1 w-40 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-md">
                                            {Hats[hatId].label} ({hatId + 1}/{Hats.length})
                                        </div>
                                        <Chevron direction="right"
                                                 onClick={() => setHatId((i) => cycle(Hats.length, i, +1 as 1))}/>
                                    </div>
                                </Row>

                                <Row label="Shirt:">
                                    <div className="flex items-center gap-2">
                                        <Chevron direction="left"
                                                 onClick={() => setShirtId((i) => cycle(Shirts.length, i, -1))}/>
                                        <div
                                            className="flex-1 w-40 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-md">
                                            {Shirts[shirtId].label} ({shirtId + 1}/{Shirts.length})
                                        </div>
                                        <Chevron direction="right"
                                                 onClick={() => setShirtId((i) => cycle(Shirts.length, i, +1 as 1))}/>
                                    </div>
                                </Row>

                                <Row label="Pants:">
                                    <div className="flex items-center gap-2">
                                        <Chevron direction="left"
                                                 onClick={() => setPantsId((i) => cycle(Pants.length, i, -1))}/>
                                        <div
                                            className="flex-1 w-40 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-md">
                                            {Pants[pantsId].label} ({pantsId + 1}/{Pants.length})
                                        </div>
                                        <Chevron direction="right"
                                                 onClick={() => setPantsId((i) => cycle(Pants.length, i, +1 as 1))}/>
                                    </div>
                                </Row>

                                <Row label="Shoes:">
                                    <div className="flex items-center gap-2">
                                        <Chevron direction="left"
                                                 onClick={() => setShoesId((i) => cycle(Shoes.length, i, -1))}/>
                                        <div
                                            className="flex-1 w-40 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-md">
                                            {Shoes[shoesId].label} ({shoesId + 1}/{Shoes.length})
                                        </div>
                                        <Chevron direction="right"
                                                 onClick={() => setShoesId((i) => cycle(Shoes.length, i, +1 as 1))}/>
                                    </div>
                                </Row>

                                <Row label="Background:">
                                    <div className="flex items-center gap-2">
                                        <Chevron direction="left"
                                                 onClick={() => setBackgroundId((i) => cycle(Background.length, i, -1))}/>
                                        <div
                                            className="flex-1 w-40 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-md">
                                            {Background[backgroundId].label} ({backgroundId + 1}/{Background.length})
                                        </div>
                                        <Chevron direction="right"
                                                 onClick={() => setBackgroundId((i) => cycle(Background.length, i, +1 as 1))}/>
                                    </div>
                                </Row>

                                <div className="mt-4 flex items-center justify-center gap-6">
                                    <button
                                        type="button"
                                        onClick={handleStartJourney}
                                        disabled={!name.trim()}
                                        className="min-w-40 px-6 py-3 rounded-xl text-lg bg-gray-400 text-gray-900 shadow-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Start Journey
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => (window.location.href = "/")}
                                        className="min-w-40 px-6 py-3 rounded-xl text-lg bg-gray-400 text-gray-900 shadow-lg hover:bg-gray-300 "
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

