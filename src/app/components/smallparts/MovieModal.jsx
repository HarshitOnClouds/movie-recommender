'use client'

import React, { useEffect, useState } from 'react'
import { addLikedMovie, removeLikedMovie, isMovieLiked } from '@/app/lib/likedMovies'
import SkeletonCard from './SkeletonCard'


function MovieModal({ movie, onClose }) {
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        setIsLiked(isMovieLiked(movie.id))
    }, [movie.id])

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                    }
                })
                const data = await res.json()
                setDetails(data)
            } catch (error) {
                console.error('Error fetching movie details:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovieDetails()
    }, [movie.id])

    const handleLikeToggle = () => {
        if (isLiked) {
            removeLikedMovie(movie.id)
            setIsLiked(false)
        } else {
            addLikedMovie(movie)
            setIsLiked(true)
        }
        window.dispatchEvent(new Event('likedMoviesChanged'))
    }

    if (!movie) return null

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {loading ? (
                    <SkeletonCard />
                ) : (
                    <>
                        <div className="relative">
                            <img
                                className="w-full h-64 object-cover rounded-t-lg"
                                src={`https://image.tmdb.org/t/p/w1280${details?.backdrop_path || movie.poster_path}`}
                                alt={movie.title}
                            />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            >
                                ✕
                            </button>
                            <button
                                onClick={handleLikeToggle}
                                className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-2xl rounded-full w-10 h-10 flex items-center justify-center transition-transform hover:scale-110"
                            >
                                {isLiked ? '⭐' : '☆'}
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div>
                                <h2 className="text-3xl font-bold">{movie.title}</h2>
                                <p className="text-gray-400 text-sm mt-1">
                                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                                    {details?.runtime && ` • ${details.runtime} min`}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 text-xl">⭐</span>
                                    <span className="text-xl font-bold">{details?.vote_average?.toFixed(1)}</span>
                                    <span className="text-gray-400 text-sm">({details?.vote_count} votes)</span>
                                </div>
                                {details?.adult && (
                                    <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold">18+</span>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {details?.genres?.map((genre) => (
                                        <span key={genre.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {details?.overview || 'No overview available.'}
                                </p>
                            </div>

                            {details?.tagline && (
                                <div>
                                    <p className="italic text-gray-400">"{details.tagline}"</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default MovieModal