"use client";

// import { useEffect, useState } from "react";



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
                        <h1 className="text-2xl font-bold">Our Mission</h1>
                        <p className="text-gray-700">Information</p>
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
                                <h1 className="text-xl font-semibold">Caden Epp (Title, ex: Software Developer)</h1>
                                <p className="text-red-900 font-medium">(Role)</p>
                                <p className="mt-2 text-gray-700">Information</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-3xl">
                            <div className="text-center md:text-right md:justify-self-end max-w-md">
                                <h1 className="text-xl font-semibold">Arun Graeff (Title, ex: Software Developer)</h1>
                                <p className="text-red-900 font-medium">(Role)</p>
                                <p className="mt-2 text-gray-700">Information</p>
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
                                src="/photos/Arun.png"
                                alt="Arun"
                                className="w-24 sm:w-32 md:w-48 object-cover rounded-xl"
                            />
                            <div className="text-center md:text-left max-w-md">
                                <h1 className="text-xl font-semibold">Keith Roberts, Software Developer</h1>
                                <p className="text-red-900 font-medium">Front-end Designer</p>
                                <p className="mt-2 text-gray-700">Information</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 max-w-3xl">
                            <div className="text-center md:text-right md:justify-self-end max-w-md">
                                <h1 className="text-xl font-semibold">Cody Carroll (Title, ex: Software Developer)</h1>
                                <p className="text-red-900 font-medium">(Role)</p>
                                <p className="mt-2 text-gray-700">Information</p>
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
                                <h1 className="text-xl font-semibold">Lincoln Gilbert (Title, ex: Software Developer)</h1>
                                <p className="text-red-900 font-medium">(Role)</p>
                                <p className="mt-2 text-gray-700">Information</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}