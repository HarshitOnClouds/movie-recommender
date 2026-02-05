'use client'

import React, { useState } from 'react'
import PopularMovies from './smallparts/PopularMovies'
import TopRatedMovies from './smallparts/TopRatedMovies'
import SearchResults from './smallparts/SearchResults'
import { GENRE_MAP } from '@/app/lib/genres'

function Home() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const [activeSearchQuery, setActiveSearchQuery] = useState('')
    const [activeGenre, setActiveGenre] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = () => {
        setActiveSearchQuery(searchQuery)
        setActiveGenre(selectedGenre)
        setIsSearching(searchQuery.length > 0 || selectedGenre !== '')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedGenre('')
        setActiveSearchQuery('')
        setActiveGenre('')
        setIsSearching(false)
    }

    return (
        <div className=''>
            {/* Search and Filter Section */}
            <div className='sticky top-0  z-10 p-4'>
                <div className='max-w-4xl mx-auto space-y-3'>
                    <div className='flex gap-3'>
                        <input
                            type='text'
                            placeholder='Search movies...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className='flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                        <button
                            onClick={handleSearch}
                            className='
                             bg-blue-600 hover:bg-blue-700 text-white
                                px-6 py-2 text-sm md:text-xl rounded-xl font-medium
    transition-all duration-300
    backdrop-blur-xl
    bg-gradient-to-b from-white/20 to-white/5
    border border-white/30
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]

                            '
                        >
                            Search
                        </button>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className='flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500'
                        >
                            <option value=''>All Genres</option>
                            {Object.entries(GENRE_MAP).map(([id, name]) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                        {isSearching && (
                            <button
                                onClick={clearFilters}
                                className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm'
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results */}
            {isSearching ? (
                <SearchResults searchQuery={activeSearchQuery} genreId={activeGenre} />
            ) : (
                <>
                    <PopularMovies />
                    <TopRatedMovies />
                </>
            )}
        </div>
    )
}

export default Home
