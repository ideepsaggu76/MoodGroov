import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Mood {
  name: string
  emoji: string
  color: string
  gradient: string[]
  description: string
}

const predefinedMoods: Mood[] = [
  {
    name: 'Happy',
    emoji: '😊',
    color: '#FFD700',
    gradient: ['#FFE259', '#FFA751'],
    description: 'Upbeat and cheerful tunes'
  },
  {
    name: 'Energetic',
    emoji: '⚡',
    color: '#FF4D4D',
    gradient: ['#FF416C', '#FF4B2B'],
    description: 'High-energy beats'
  },
  {
    name: 'Relaxed',
    emoji: '😌',
    color: '#A2E6CD',
    gradient: ['#A2E6CD', '#7FDBDA'],
    description: 'Calm and soothing melodies'
  },
  {
    name: 'Focused',
    emoji: '🎯',
    color: '#A78BFA',
    gradient: ['#8B5CF6', '#A78BFA'],
    description: 'Concentration-enhancing tracks'
  },
  {
    name: 'Romantic',
    emoji: '💝',
    color: '#FF69B4',
    gradient: ['#FF69B4', '#FF8FAB'],
    description: 'Love and romance vibes'
  },
  {
    name: 'Melancholic',
    emoji: '🥺',
    color: '#6B7280',
    gradient: ['#6B7280', '#4B5563'],
    description: 'Deep and emotional songs'
  },
]

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [customMood, setCustomMood] = useState('')
  const [isColorWheelOpen, setIsColorWheelOpen] = useState(false)
  const [activeColor, setActiveColor] = useState('#A2E6CD')

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    setCustomMood('')
    const selectedMoodObj = predefinedMoods.find(m => m.name === mood)
    if (selectedMoodObj) {
      setActiveColor(selectedMoodObj.color)
      // Update the root CSS variables for the theme
      document.documentElement.style.setProperty('--accent-color', selectedMoodObj.color)
      document.documentElement.style.setProperty('--gradient-start', selectedMoodObj.gradient[0])
      document.documentElement.style.setProperty('--gradient-end', selectedMoodObj.gradient[1])
    }
  }

  const handleCustomMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMood(e.target.value)
    setSelectedMood('')
  }

  return (
    <div className="space-y-8">
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {predefinedMoods.map((mood) => (
          <motion.button
            key={mood.name}
            onClick={() => handleMoodSelect(mood.name)}
            className={`relative p-6 rounded-2xl text-center transition-all duration-300 transform cursor-pointer
              overflow-hidden backdrop-blur-sm border-2
              ${selectedMood === mood.name
                ? 'border-white scale-105'
                : 'border-white/10 hover:border-white/30'
              }`}
            style={{
              background: selectedMood === mood.name
                ? `linear-gradient(135deg, ${mood.gradient[0]}, ${mood.gradient[1]})`
                : 'rgba(0, 0, 0, 0.2)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: selectedMood === mood.name ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl mb-3 block">{mood.emoji}</span>
              <span className="font-medium text-lg block mb-1">{mood.name}</span>
              <span className="text-sm text-white/70">{mood.description}</span>
            </motion.div>
            
            {/* Animated background particles */}
            <AnimatePresence>
              {selectedMood === mood.name && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full h-full top-0 left-0"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [1, 2],
                        opacity: [0.3, 0],
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      style={{
                        background: `radial-gradient(circle, ${mood.color}33 0%, transparent 70%)`,
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          value={customMood}
          onChange={handleCustomMoodChange}
          placeholder="Or describe your mood in your own words..."
          className="w-full bg-black/30 text-white px-6 py-4 rounded-xl
                   border-2 border-white/10 focus:border-white/30
                   focus:outline-none backdrop-blur-sm
                   placeholder-white/50 text-lg"
        />
        {customMood && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <span className="text-accent-mint text-xl">✓</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 