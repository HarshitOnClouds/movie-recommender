import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

export async function POST(request) {
    try {
        const { selectedMovies } = await request.json()

        if (!selectedMovies || selectedMovies.length === 0) {
            return NextResponse.json(
                { error: 'No movies selected' },
                { status: 400 }
            )
        }

        const movieTitles = selectedMovies.map(m => m.title).join(', ')
        
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a movie recommendation expert. Based on the user\'s liked movies, recommend similar movies. Return ONLY a JSON array of movie titles, nothing else. Format: ["Movie 1", "Movie 2", "Movie 3", ...]'
                },
                {
                    role: 'user',
                    content: `Based on these movies I liked: ${movieTitles}, recommend 10 similar movies. Return only a JSON array of movie titles.`
                }
            ],
            model: 'openai/gpt-oss-120b',
            temperature: 0.5,
            max_tokens: 500
        })

        const recommendations = JSON.parse(completion.choices[0].message.content)
        
        return NextResponse.json({ recommendations })
    } catch (error) {
        console.error('Groq API error:', error)
        return NextResponse.json(
            { error: 'Failed to get recommendations' },
            { status: 500 }
        )
    }
}