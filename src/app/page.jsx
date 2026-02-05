'use client'
import { useState } from "react";
import Home from "./components/Home";
import Liked from "./components/Liked";
import Recommendations from "./components/Recommendations";

export default function Page() {

  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <p className="font-black text-3xl pt-4 md:text-4xl lg:text-6xl">
          CineFind
        </p>
        <p className="pb-4 md:text-xl">
          find your perfect getaway movie
        </p>
      </div>
      {/* Fixed Navigation Bar */}
      <div className="fixed bottom-20 left-0 right-0 shadow-lg z-50">
        <div className="flex justify-center gap-4 p-4">
          <button
            onClick={() => setActiveTab('home')}
                     className={`
    px-6 py-2 text-sm md:text-xl rounded-xl font-medium
    transition-all duration-300

    backdrop-blur-xl
    bg-gradient-to-b from-white/20 to-white/5
    border border-white/30
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]

    ${activeTab === 'home'
                ? 'bg-blue-500/60 text-white shadow-blue-500/30'
                : 'text-gray-200 hover:bg-white/20'
              }
  `}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('liked')}
                     className={`
    px-6 py-2 text-sm md:text-xl rounded-xl font-medium
    transition-all duration-300

    backdrop-blur-xl
    bg-gradient-to-b from-white/20 to-white/5
    border border-white/30
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]

    ${activeTab === 'liked'
                ? 'bg-blue-500/60 text-white shadow-blue-500/30'
                : 'text-gray-200 hover:bg-white/20'
              }
  `}
          >
            Liked
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`
    px-6 py-2 text-sm md:text-xl rounded-xl font-medium
    transition-all duration-300

    backdrop-blur-xl
    bg-gradient-to-b from-white/20 to-white/5
    border border-white/30
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]

    ${activeTab === 'recommendations'
                ? 'bg-blue-500/60 text-white shadow-blue-500/30'
                : 'text-gray-200 hover:bg-white/20'
              }
  `}
          >
            Recommendations
          </button>


        </div>
      </div>

      {/* Content with bottom padding to account for fixed nav */}
      <div className="pb-20">
        {activeTab === 'home' && <Home />}
        {activeTab === 'liked' && <Liked />}
        {activeTab === 'recommendations' && <Recommendations />}
      </div>
    </div>
  );
}
