'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1C1F2D]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-6xl mb-6">🎵❓</div>
        <h2 className="text-3xl font-bold mb-4 text-white">
          404 - Page Not Found
        </h2>
        <p className="text-lg text-slate-300 mb-8 max-w-md mx-auto">
          Looks like this track skipped a beat! Let's get you back to the playlist.
        </p>
        <Link href="/" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-accent-mint text-[#1C1F2D] rounded-full font-bold text-lg
                       hover:bg-[#8EDEC1] transition-colors duration-300 cursor-pointer"
          >
            Back to Home
          </motion.a>
        </Link>
      </motion.div>
    </div>
  )
} 