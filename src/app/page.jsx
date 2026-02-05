'use client'
import { useState } from "react";
import Home from "./components/Home";
import Liked from "./components/Liked";
import Recommendations from "./components/Recommendations";

export default function Page() {

  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Fixed Navigation Bar */}
      <div className="fixed bottom-20 left-0 right-0 shadow-lg z-50">
        <div className="flex justify-center gap-4 p-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-6 py-2 text-sm rounded-lg font-medium transition-colors ${
              activeTab === 'home'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-6 py-2 text-sm rounded-lg font-medium transition-colors ${
              activeTab === 'liked'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Liked
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-2 text-sm rounded-lg font-medium transition-colors ${
              activeTab === 'recommendations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
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
