"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Option = { label: string; sprite: string };

const Background: Option[] = [
    { label: "None", sprite: "" },
    { label: "America", sprite: "/background/AmericanBackground.png" },
    { label: "Japan", sprite: "/background/JapaneseBackground.png" },
    { label: "Mexican", sprite: "/background/MexicanBackground.png" },
    { label: "Germany", sprite: "/background/GermanBackground.png" },
];

const Hats: Option[] = [
    { label: "None", sprite: "" },
    { label: "German Hat", sprite: "/sprites/German/german-hat.png" },
    { label: "Mariachi Hat", sprite: "/sprites/Mariachi/Mariachi_Hat.png" },
    { label: "Samurai Hat", sprite: "/sprites/Samurai/Samurai_helmet.png" },
    { label: "American Hat", sprite: "/sprites/American/Shane_Gillis.png" }
];

const Shirts: Option[] = [
    { label: "None", sprite: "" },
    { label: "German Shirt", sprite: "/sprites/German/german-shirt.png" },
    { label: "Mariachi Shirt", sprite: "/sprites/Mariachi/Mariachi_Shirt.png" },
    { label: "Samurai Shirt", sprite: "/sprites/Samurai/Samurai_Armor.png" },
    { label: "American Shirt", sprite: "/sprites/American/Valley_Forge.png" },
];

const Pants: Option[] = [
    { label: "None", sprite: "" },
    { label: "German Pants", sprite: "/sprites/German/german-pants.png" },
    { label: "American Pants", sprite: "/sprites/American/Jeans.png" },
    { label: "Mariachi Pants", sprite: "/sprites/Mariachi/Mariachi_Pants.png" },
    { label: "Samurai Pants", sprite: "/sprites/Samurai/Samurai_Waist.png" },
];

const Shoes: Option[] = [
    { label: "None", sprite: "" },
    { label: "German Shoes", sprite: "/sprites/German/german-shoes.png" },
    { label: "American Shoes", sprite: "/sprites/American/Boots.png" },
    { label: "Mariachi Shoes", sprite: "/sprites/Mariachi/Mariachi_Boots.png" },
    { label: "Samurai Shoes", sprite: "/sprites/Samurai/Samurai_Boots.png" },
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

    function getSelections() {
        return {
            hat: Hats[hatId],
            shirt: Shirts[shirtId],
            pants: Pants[pantsId],
            shoes: Shoes[shoesId],
            background: Background[backgroundId],
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

    function isValidCharacter() {
        const hasName = name.trim().length > 0;

        const hasHat = Hats[hatId].label !== "None";
        const hasShirt = Shirts[shirtId].label !== "None";
        const hasPants = Pants[pantsId].label !== "None";
        const hasShoes = Shoes[shoesId].label !== "None";
        const hasBackground = Background[backgroundId].label !== "None";

        return hasName && hasHat && hasShirt && hasPants && hasShoes && hasBackground;
    }


    const handleStartJourney = async () => {
        if (!isValidCharacter()) {
            alert("Please enter a name and select all clothing and a background before starting your journey.");
            return;
        }

        const userPayload = {
            name,
            overallCulture: Background[backgroundId].label,
            hat: Hats[hatId].label.replace(/\s+/g, ""),
            shirt: Shirts[shirtId].label.replace(/\s+/g, ""),
            pants: Pants[pantsId].label.replace(/\s+/g, ""),
            shoes: Shoes[shoesId].label.replace(/\s+/g, "")
        };

        try {
            const response = await fetch("http://localhost:8080/api/User", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPayload),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const sessionId = await response.text();
            console.log("Session ID:", sessionId);

            router.push(`/monologue?sessionId=${encodeURIComponent(sessionId)}`);
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to start journey. Check backend connection.");
        }
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
                        <div className="flex items-center justify-center bg-[]">


                            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg border border-black">
    {/* Background image */}
    {selections.background.sprite ? (
        <img
            src={selections.background.sprite}
            alt={selections.background.label}
            className="absolute h-full w-full object-cover z-0"
        />
    ) : (
        <div className="absolute h-full w-full bg-gray-200 z-0" />
    )}

    {/* Character layers */}
    <img
        src="/sprites/BaseCharacter/Yellow_Man.png"
        alt="base model"
        className="absolute h-full w-full object-contain z-10"
    />

    {selections.pants.sprite && (
        <img
            src={selections.pants.sprite}
            alt={selections.pants.label}
            className="absolute h-full w-full object-contain z-20"
        />
    )}
    {selections.shirt.sprite && (
        <img
            src={selections.shirt.sprite}
            alt={selections.shirt.label}
            className="absolute h-full w-full object-contain z-30"
        />
    )}
    {selections.shoes.sprite && (
        <img
            src={selections.shoes.sprite}
            alt={selections.shoes.label}
            className="absolute h-full w-full object-contain z-40"
        />
    )}
    {selections.hat.sprite && (
        <img
            src={selections.hat.sprite}
            alt={selections.hat.label}
            className="absolute h-full w-full object-contain z-50"
        />
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

                                <Row label="Overall Culture:">
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
                                        disabled={!isValidCharacter()}
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

