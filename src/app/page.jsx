'use client'
import { useState } from "react";
import Home from "./components/Home";
import Liked from "./components/Liked";
import Recommendations from "./components/Recommendations";

export default function Page() {

  const [tab, setTab] = useState("home");

  return (
    <div className="bg-slate-800 h-screen max-h-screen overflow-y-scroll text-white" >

      <div className="px-3 pt-4 ">
        <p className="text-xl">
          CineSearch
        </p>
        <p>
          Find your favorite movies and series
        </p>
      </div>



      <div className="p-4 max-h-screen">
        {tab === "home" && (
          <Home />
        )}
        {tab === "liked" && (
          <Liked />
        )}
        {tab === "recommendations" && (
          <Recommendations />
        )}
      </div>
      {/* <div className="sticky bottom-20 h-18 w-[90vw] mx-auto bg-gray-700 rounded-4xl opacity-80 py-4"></div> */}
      <div className=" flex justify-around w-[90vw] mx-auto items-center sticky bottom-0  rounded-4xl py-4">
        <button className="bg-black text-sm px-5 py-2 rounded-2xl " onClick={() => { setTab('home') }}>
          Home
        </button>
        <button className="bg-black text-sm px-5 py-2 rounded-2xl" onClick={() => { setTab('liked') }}>
          Liked
        </button>
        <button className="bg-black text-sm px-5 py-2 rounded-2xl" onClick={() => { setTab('recommendations') }}>
          Recommendations
        </button>
      </div>


    </div>
  );
}
