'use client'

import React, { useState, useEffect } from 'react'
import { getLikedMovies } from '@/app/lib/likedMovies'
import { GENRE_MAP } from '@/app/lib/genres'
import MovieModal from './smallparts/MovieModal'

function Recommendations() {
    const [likedMovies, setLikedMovies] = useState([])
    const [selectedMovies, setSelectedMovies] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [error, setError] = useState('')

    const MAX_SELECTION = 6

    useEffect(() => {
        const movies = getLikedMovies()
        setLikedMovies(movies)
    }, [])

    const toggleMovieSelection = (movie) => {
        setSelectedMovies(prev => {
            const exists = prev.find(m => m.id === movie.id)
            if (exists) {
                return prev.filter(m => m.id !== movie.id)
            } else {
                if (prev.length >= MAX_SELECTION) {
                    setError(`You can select up to ${MAX_SELECTION} movies only`)
                    setTimeout(() => setError(''), 3000)
                    return prev
                }
                return [...prev, movie]
            }
        })
    }

    const getRecommendations = async () => {
        if (selectedMovies.length === 0) {
            setError('Please select at least one movie')
            return
        }

        setLoading(true)
        setError('')
        
        try {
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ selectedMovies })
            })

            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to get recommendations')
            }

            // Search for each recommended movie
            const moviePromises = data.recommendations.map(async (title) => {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&language=en-US&page=1`,
                    {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                        }
                    }
                )
                const searchData = await res.json()
                return searchData.results[0]
            })

            const movieResults = await Promise.all(moviePromises)
            setRecommendations(movieResults.filter(Boolean))
            
            setSelectedMovies([])
        } catch (error) {
            console.error('Error getting recommendations:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (likedMovies.length === 0) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Get Recommendations</h2>
                <p className="text-gray-400">You need to like some movies first to get recommendations!</p>
            </div>
        )
    }

    return (
        <>
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Get AI Recommendations</h2>
            
            {/* Selection Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-400">
                        Select up to {MAX_SELECTION} movies ({selectedMovies.length}/{MAX_SELECTION} selected)
                    </p>
                    <button
                        onClick={getRecommendations}
                        disabled={loading || selectedMovies.length === 0}
                        className={`px-6 py-2 rounded-lg font-medium ${
                            loading || selectedMovies.length === 0
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-600 bg-opacity-20 border border-red-600 rounded-lg p-3 mb-4">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {likedMovies.map((movie) => {
                        const isSelected = selectedMovies.find(m => m.id === movie.id)
                        const isDisabled = !isSelected && selectedMovies.length >= MAX_SELECTION
                        
                        return (
                            <div 
                                key={movie.id}
                                onClick={() => !isDisabled && toggleMovieSelection(movie)}
                                className={`relative cursor-pointer transition-all ${
                                    isSelected 
                                        ? 'ring-4 ring-green-500' 
                                        : isDisabled 
                                            ? 'opacity-30 cursor-not-allowed' 
                                            : 'opacity-70 hover:opacity-100'
                                }`}
                            >
                                <img
                                    className="rounded-lg w-full h-40 object-cover"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                                        ✓
                                    </div>
                                )}
                                <h3 className="font-bold text-xs mt-1 line-clamp-2">{movie.title}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4 mt-8">Recommended Movies</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {recommendations.map((movie) => (
                            <div 
                                key={movie.id}
                                className="flex flex-col cursor-pointer hover:scale-105 transition-transform"
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
                </>
            )}
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

export default Recommendations
