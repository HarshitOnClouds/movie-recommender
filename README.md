# 🎬 Movie Recommender

A sleek movie discovery app that helps you find your next favorite film. Browse popular movies, search for titles, mark ones you like, and get personalized recommendations powered by AI.

## What You Get

- **Discover Movies**: Browse trending and top-rated movies
- **Search**: Find specific movies easily
- **Like & Save**: Mark movies you enjoy for later reference
- **Smart Recommendations**: Get AI-powered suggestions based on what you liked
- **Responsive Design**: Works great on desktop and mobile

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Setup

1. **Clone or download the project**
   ```bash
   cd movie-recommender
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   GROQ_API_KEY=your_groq_api_key
   ```
   
   - Get TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)
   - Get Groq API key from [console.groq.com](https://console.groq.com)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in your browser**
   
   Visit `http://localhost:3000` and start exploring!

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Check code quality

## Tech Stack

- **Next.js** - React framework for the UI
- **Tailwind CSS** - Styling
- **TMDB API** - Movie data
- **Groq** - AI recommendations
- **Fuse.js** - Fuzzy search

## How It Works

1. Browse and explore movies
2. Like movies you're interested in
3. Your liked movies are saved locally
4. Request recommendations to get AI-powered suggestions based on your taste
5. Discover new movies you might enjoy!

---