export const getLikedMovies = () => {
    if (typeof window === 'undefined') return []
    const liked = localStorage.getItem('likedMovies')
    return liked ? JSON.parse(liked) : []
}

export const addLikedMovie = (movie) => {
    const liked = getLikedMovies()
    const exists = liked.find(m => m.id === movie.id)
    if (!exists) {
        const updated = [...liked, movie]
        localStorage.setItem('likedMovies', JSON.stringify(updated))
        return updated
    }
    return liked
}

export const removeLikedMovie = (movieId) => {
    const liked = getLikedMovies()
    const updated = liked.filter(m => m.id !== movieId)
    localStorage.setItem('likedMovies', JSON.stringify(updated))
    return updated
}

export const isMovieLiked = (movieId) => {
    const liked = getLikedMovies()
    return liked.some(m => m.id === movieId)
}