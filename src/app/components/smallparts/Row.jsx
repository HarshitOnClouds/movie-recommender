import React from 'react'
import MovieCard from './MovieCard'

function Row() {
    return (
        <div className='flex overflow-x-scroll gap-4 py-4'>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
    </div>
  )
}

export default Row
