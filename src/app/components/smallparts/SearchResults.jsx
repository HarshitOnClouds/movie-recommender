'use client'

import { useEffect, useState } from "react"
import { GENRE_MAP } from "@/app/lib/genres"
import React from 'react'

function SearchResults({ searchQuery, genreId }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function searchMovies() {
            setLoading(true)
            try {
                let url = ''
                if (searchQuery && genreId) {
                    // Search with genre filter
                    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`
                } else if (searchQuery) {
                    // Search only
                    url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`
                } else if (genreId) {
                    // Genre filter only
                    url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`
                }

                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                    }
                })
                const data = await res.json()
                
                // Filter by genre if both search and genre are selected
                let results = data.results || []
                if (searchQuery && genreId) {
                    results = results.filter(movie => 
                        movie.genre_ids?.includes(parseInt(genreId))
                    )
                }
                
                setMovies(results)
            } catch (error) {
                console.error('Error searching movies:', error)
            } finally {
                setLoading(false)
            }
        }

        searchMovies()
    }, [searchQuery, genreId])

    if (loading) {
        return <div className="text-center py-10 text-gray-400">Loading...</div>
    }

    if (movies.length === 0) {
        return <div className="text-center py-10 text-gray-400">No movies found</div>
    }

    return (
        <div className="p-4">
            <div className="text-xl font-bold mb-4">
                Search Results ({movies.length})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="flex flex-col">
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
    )
}

export default SearchResults