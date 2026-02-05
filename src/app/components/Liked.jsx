'use client'

import React, { useState, useEffect } from 'react'
import { getLikedMovies, removeLikedMovie } from '@/app/lib/likedMovies'
import { GENRE_MAP } from '@/app/lib/genres'
import MovieModal from './smallparts/MovieModal'

function Liked() {
    const [likedMovies, setLikedMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)

    const loadLikedMovies = () => {
        setLikedMovies(getLikedMovies())
    }

    useEffect(() => {
        loadLikedMovies()
        
        // Listen for changes to liked movies
        window.addEventListener('likedMoviesChanged', loadLikedMovies)
        return () => window.removeEventListener('likedMoviesChanged', loadLikedMovies)
    }, [])

    const handleRemove = (movieId, e) => {
        e.stopPropagation()
        removeLikedMovie(movieId)
        loadLikedMovies()
    }

    if (likedMovies.length === 0) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Your Liked Movies</h2>
                <p className="text-gray-400">You haven't liked any movies yet. Start exploring!</p>
            </div>
        )
    }

    return (
        <>
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Liked Movies ({likedMovies.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {likedMovies.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="flex flex-col cursor-pointer hover:scale-105 transition-transform relative group"
                        onClick={() => setSelectedMovie(movie)}
                    >
                        <button
                            onClick={(e) => handleRemove(movie.id, e)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            ✕
                        </button>
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

export default Liked
