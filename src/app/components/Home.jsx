import React from 'react'
import PopularMovies from './smallparts/PopularMovies'
import TopRatedMovies from './smallparts/TopRatedMovies'

function Home() {
    return (
        <div className=' '>
            <PopularMovies/>
            <TopRatedMovies/>
        </div>
    )
}

export default Home
