'use client'

import { useEffect, useState } from "react"
import { GENRE_MAP } from "@/app/lib/genres"
import MovieModal from "./MovieModal"
import React from 'react'


function PopularMovies() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        async function loadMovies() {
            const res = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                }
            });
            const data = await res.json();
            setMovies(data.results);
        }
        loadMovies();
    }, []);


    return (
        <>
        <div className="text-xl font-bold px-4 pt-4">
            Popular Movies
        </div>
        <div className="flex overflow-x-scroll gap-4 py-4 px-4">
            {movies.map((movie) => (
                <div 
                    key={movie.id} 
                    className="w-40 flex flex-col shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedMovie(movie)}
                >
                    <img
                        className="rounded-lg w-full h-60 object-cover"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <h3 className="font-bold text-sm mt-2 line-clamp-2">{movie.title}</h3>
                    <p className="text-xs text-gray-400">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {movie.genre_ids?.slice(0, 2).map(id => GENRE_MAP[id]).join(', ')}
                    </p>
                </div>
            ))}
        </div>

        {selectedMovie && (
            <MovieModal 
                movie={selectedMovie} 
                onClose={() => setSelectedMovie(null)} 
            />
        )}
        </>
    )
}

export default PopularMovies
