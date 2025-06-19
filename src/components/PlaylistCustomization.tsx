import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Track {
  name: string
  artists: string
  albumName: string
  albumImage?: string
}

export default function PlaylistCustomization() {
  const { data: session } = useSession()
  const [language, setLanguage] = useState('')
  const [artist, setArtist] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTracks, setGeneratedTracks] = useState<Track[]>([])
  const [error, setError] = useState('')
  const [activeInput, setActiveInput] = useState<'language' | 'artist' | null>(null)

  const handleGenerate = async () => {
    if (!session?.user?.accessToken) {
      setError('Please log in to create a playlist')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: 'Happy', // This should come from the MoodSelector component
          language,
          artist,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create playlist')
      }

      setGeneratedTracks(data.tracks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create playlist')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-black/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/10"
    >
      <div className="flex items-center space-x-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-mint to-accent-powder flex items-center justify-center"
        >
          <span className="text-2xl">🎨</span>
        </motion.div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Customize Your Playlist
        </h3>
      </div>
      
      <div className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <label className="block text-lg font-medium text-white/80 mb-2">
            Preferred Language
          </label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onFocus={() => setActiveInput('language')}
            onBlur={() => setActiveInput(null)}
            placeholder="e.g., English, Spanish, Korean..."
            className="w-full bg-white/5 text-white px-6 py-4 rounded-xl
                     border-2 transition-all duration-300
                     focus:outline-none placeholder-white/30 text-lg
                     backdrop-blur-sm"
            style={{
              borderColor: activeInput === 'language' ? 'rgb(var(--accent-mint))' : 'rgba(255, 255, 255, 0.1)'
            }}
          />
          <AnimatePresence>
            {language && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute right-4 top-[calc(50%+4px)] transform -translate-y-1/2 text-accent-mint"
              >
                ✓
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <label className="block text-lg font-medium text-white/80 mb-2">
            Favorite Artist
          </label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            onFocus={() => setActiveInput('artist')}
            onBlur={() => setActiveInput(null)}
            placeholder="e.g., Taylor Swift, BTS..."
            className="w-full bg-white/5 text-white px-6 py-4 rounded-xl
                     border-2 transition-all duration-300
                     focus:outline-none placeholder-white/30 text-lg
                     backdrop-blur-sm"
            style={{
              borderColor: activeInput === 'artist' ? 'rgb(var(--accent-mint))' : 'rgba(255, 255, 255, 0.1)'
            }}
          />
          <AnimatePresence>
            {artist && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute right-4 top-[calc(50%+4px)] transform -translate-y-1/2 text-accent-mint"
              >
                ✓
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2 bg-red-500/10 p-3 rounded-lg backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`w-full py-4 rounded-xl font-medium text-lg transition-all duration-300
          relative overflow-hidden ${
            isGenerating
              ? 'bg-accent-mint/50 cursor-not-allowed'
              : 'bg-accent-mint hover:bg-accent-mint/90'
          }`}
      >
        <AnimatePresence>
          {isGenerating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center space-x-3"
            >
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Creating Magic...</span>
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center space-x-2"
            >
              <span>Generate Playlist</span>
              <span className="text-xl">✨</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {generatedTracks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-4"
          >
            <h4 className="text-xl font-bold text-white/90">Your Curated Tracks</h4>
            {generatedTracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm
                         border-2 border-white/10 hover:border-white/20 transition-all duration-300
                         cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {track.albumImage && (
                  <motion.img
                    src={track.albumImage}
                    alt={track.albumName}
                    className="w-16 h-16 rounded-lg object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate group-hover:text-accent-mint transition-colors">
                    {track.name}
                  </div>
                  <div className="text-sm text-white/60 truncate">
                    {track.artists} • {track.albumName}
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ▶️
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 