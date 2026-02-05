'use client'

import { useEffect, useState } from "react"
import { GENRE_MAP } from "@/app/lib/genres"
import MovieModal from "./MovieModal"
import React from 'react'
import Fuse from 'fuse.js'

function SearchResults({ searchQuery, genreId }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
        async function searchMovies() {
            setLoading(true)
            try {
                let results = []

                if (searchQuery) {
                    // Fetch multiple pages from TMDB search API
                    const promises = []
                    for (let page = 1; page <= 3; page++) {
                        promises.push(
                            fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=${page}`, {
                                method: 'GET',
                                headers: {
                                    accept: 'application/json',
                                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                                }
                            })
                        )
                    }
                    
                    const responses = await Promise.all(promises)
                    const dataPromises = responses.map(res => res.json())
                    const datasets = await Promise.all(dataPromises)
                    
                    // Combine all results and remove duplicates
                    const movieMap = new Map()
                    datasets.forEach(data => {
                        data.results?.forEach(movie => {
                            if (!movieMap.has(movie.id)) {
                                movieMap.set(movie.id, movie)
                            }
                        })
                    })

                    let allMovies = Array.from(movieMap.values())

                    // Apply fuzzy search to refine results
                    const fuse = new Fuse(allMovies, {
                        keys: ['title', 'original_title'],
                        threshold: 0.3, 
                        includeScore: true,
                        ignoreLocation: true,
                        minMatchCharLength: 2,
                        isCaseSensitive: false
                    })

                    const fuzzyResults = fuse.search(searchQuery)
                    results = fuzzyResults.map(result => result.item)

                    // If fuzzy search returns nothing, use all TMDB results
                    if (results.length === 0) {
                        results = allMovies
                    }

                    // Filter by genre if specified
                    if (genreId) {
                        results = results.filter(movie => 
                            movie.genre_ids?.includes(parseInt(genreId))
                        )
                    }
                } else if (genreId) {
                    // Only genre filter, use discover endpoint
                    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`, {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
                        }
                    })
                    const data = await res.json()
                    results = data.results || []
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
        <>
        <div className="p-4">
            <div className="text-xl font-bold mb-4">
                Search Results ({movies.length})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
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

export default SearchResults