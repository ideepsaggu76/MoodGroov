'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function MusicMascot() {
  const [isWaving, setIsWaving] = useState(false)

  const mascotVariants = {
    wave: {
      rotate: [0, -20, 20, -20, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      }
    }
  }

  return (
    <motion.div 
      className="mascot-container"
      onClick={() => setIsWaving(true)}
      animate={isWaving ? "wave" : ""}
      variants={mascotVariants}
      onAnimationComplete={() => setIsWaving(false)}
    >
      <div className="relative w-full h-full">
        {/* Base Note */}
        <motion.div 
          className="absolute inset-0 bg-lavender rounded-full opacity-80"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Eyes */}
            <div className="flex space-x-2 mb-2">
              <div className="w-2 h-2 bg-gray-800 rounded-full" />
              <div className="w-2 h-2 bg-gray-800 rounded-full" />
            </div>
            {/* Smile */}
            <div className="w-4 h-4 border-b-2 border-gray-800 rounded-full" />
          </div>
        </div>

        {/* Musical Notes */}
        <motion.div
          className="absolute -top-4 -right-2"
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ♪
        </motion.div>
        <motion.div
          className="absolute -top-2 -left-2"
          animate={{
            y: [5, -5, 5],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ♫
        </motion.div>
      </div>
    </motion.div>
  )
} 