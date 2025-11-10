"use client";

export default function aboutUs() {
    
    return (
        <main className="p-6">
            <div className="relative rounded-3xl bg-gray-300 p-6 shadow">

                {/* Exit Button */}
                <button
                    type="button"
                    onClick={() => (window.location.href = "/")}
                    className="absolute right-6 top-6 rounded-xl border border-black bg-gray-400 px-4 py-2 text-lg shadow hover:bg-gray-300"
                >
                    Exit to Menu
                </button>

                <div className="mt-16 text-center">
                    {/* Title*/}
                    <div>
                        <h1 className="text-2xl font-bold">Our Story</h1>
                        <p className="pl-30 pr-30 mt-2">Side Quest is an interactive game developed by the Sons of Anton team for the 2025 Indian Hills Byte Jam competition. 
                            It uses artifical intelligence to create unique, evolving stories that guide players to make the right choices. Step into a world of diverse 
                            cultures and endless adventures! Create your own custom character and mix and match outfit pieces — from hats and shirts to pants and 
                            shoes — inspired by four unique cultures.</p>
                        
                        <p className="mt-2 pl-30 pr-30">No two adventures are ever the same thanks to our AI-generated storylines, each filled with new choices and outcomes. Play fast, think smart, 
                            and climb the leaderboard to prove you're the ultimate explorer!</p>
                    </div>

                    <div className="mt-10">
                        <h1 className="font-semibold text-xl">Meet The Team</h1>
                    </div>

                    {/* Photo and text info */}
                    <div className="flex justify-center mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-3xl">
                            <img
                                src="/photos/Caden.png"
                                alt="Arun"
                                className="w-24 sm:w-32 md:w-48 object-cover rounded-xl"
                            />
                            <div className="text-center md:text-left max-w-md">
                                <h1 className="text-xl font-semibold">Caden Epp, Team Lead</h1>
                                <p className="text-red-900 font-medium">Full Stack - Software Developer</p>
                                <p className="mt-2 text-gray-700">Lead developer for the back-end development. Main AI director/implementor. Team product manager.</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-3xl">
                            <div className="text-center md:text-right md:justify-self-end max-w-md">
                                <h1 className="text-xl font-semibold">Arun Graeff, Main Assistant</h1>
                                <p className="text-red-900 font-medium">Software Developer</p>
                                <p className="mt-2 text-gray-700">Assisted in back-end development. Designed poster board outline.</p>
                            </div>
                            <img
                                src="/photos/Arun.png"
                                alt="Arun"
                                className="w-24 sm:w-32 md:w-48 object-cover rounded-xl"
                            />
                        </div>
                    </div>


                    <div className="flex justify-center mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-3xl">
                            <img
                                src="/photos/Keith.png"
                                alt="Arun"
                                className="w-24 sm:w-32 md:w-48 object-cover rounded-xl"
                            />
                            <div className="text-center md:text-left max-w-md">
                                <h1 className="text-xl font-semibold">Keith Roberts, Software Developer</h1>
                                <p className="text-red-900 font-medium">Front-end Developer</p>
                                <p className="mt-2 text-gray-700">Lead developer for front-end development.</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-3xl">
                            <div className="text-center md:text-right md:justify-self-end max-w-md">
                                <h1 className="text-xl font-semibold">Cody Carroll, Secondary Assistant</h1>
                                <p className="text-red-900 font-medium">Software Developer</p>
                                <p className="mt-2 text-gray-700">Assisted in character and background design. Assisted in webpage design by vibe coding.</p>
                            </div>
                            <img
                                src="/photos/Cody.png"
                                alt="Arun"
                                className="w-24 sm:w-32 md:w-48 object-cover rounded-xl"
                            />
                        </div>
                    </div>


                    <div className="flex justify-center mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-3xl">
                            <img
                                src="/photos/Lincoln.png"
                                alt="Arun"
                                className="w-24 sm:w-32 md:w-48 object-cover rounded-xl"
                            />
                            <div className="text-center md:text-left max-w-md">
                                <h1 className="text-xl font-semibold">Lincoln Gilbert, Lead Designer</h1>
                                <p className="text-red-900 font-medium">UI/UX Designer</p>
                                <p className="mt-2 text-gray-700">Lead Character and background designer. Assisted in webpage development by vibe coding.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}