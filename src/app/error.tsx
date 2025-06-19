'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1C1F2D]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-6xl mb-6">😢</div>
        <h2 className="text-3xl font-bold mb-4 text-white">
          Oops! Something went wrong
        </h2>
        <p className="text-lg text-slate-300 mb-8 max-w-md mx-auto">
          Don't worry, it happens to the best of us! Let's try that again.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => reset()}
          className="px-8 py-3 bg-accent-mint text-[#1C1F2D] rounded-full font-bold text-lg
                     hover:bg-[#8EDEC1] transition-colors duration-300"
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  )
} 