'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
// import DashboardHeader from '@/components/DashboardHeader'
// import MoodSelector from '@/components/MoodSelector'
// import PlaylistCustomization from '@/components/PlaylistCustomization'
// import MusicRecommendations from '@/components/MusicRecommendations'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  // Debug logging
  console.log('Dashboard - Session status:', status, 'Session:', session)

  useEffect(() => {
    console.log('Dashboard useEffect - Status:', status)
    // Don't redirect immediately, just log for debugging
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#1C1F2D] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            🎵
          </motion.div>
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/70 text-lg"
          >
            Loading your musical journey...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1C1F2D] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.2, 0.1],
              left: ['0%', '100%', '0%'],
              top: [`${30 * i}%`, `${30 * i + 10}%`, `${30 * i}%`],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: '50vw',
              height: '50vw',
              background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
        ))}
      </div>

      {/* <DashboardHeader /> */}
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to your dashboard</h1>
          {/* <MoodSelector /> */}
          {/* <PlaylistCustomization /> */}
          {/* <MusicRecommendations /> */}
        </motion.div>
      </main>
    </div>
  )
}