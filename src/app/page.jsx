'use client'
import { useState } from "react";
import Home from "./components/Home";
import Liked from "./components/Liked";
import Recommendations from "./components/Recommendations";

export default function Page() {

  const [tab, setTab] = useState("home");

  return (
    <div className="bg-slate-800 h-screen w-screen text-white" >

      <div className="px-3 py-4">
        <p className="text-xl">
          CineSearch
        </p>
        <p>
          Find your favorite movies and series
        </p>
      </div>

      <div className="bg-slate-900 flex justify-around p-4 ">
        <button onClick={()=>{setTab('home')}}>
          Home
        </button>
        <button onClick={()=>{setTab('liked')}}>
          Liked
        </button>
        <button onClick={()=>{setTab('recommendations')}}>
          Recommendations
        </button>
      </div>

      <div className="p-4">
        {tab === "home" && (
          <Home/>
        )}
        {tab === "liked" && (   
          <Liked/>
        )}
        {tab === "recommendations" && (
          <Recommendations/>
        )}
      </div>


    </div>
  );
}
