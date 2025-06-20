'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardHeader from '@/components/DashboardHeader'
import MoodSelector from '@/components/MoodSelector'
import PlaylistCustomization from '@/components/PlaylistCustomization'
import MusicRecommendations from '@/components/MusicRecommendations'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/')
    }
  }, [status])

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

      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <section className="space-y-8">
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
              >
                Create Your Mood Playlist
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/70"
              >
                Select or describe your mood, and let us create the perfect playlist for you
              </motion.p>
            </div>
            
            <MoodSelector />            <PlaylistCustomization />
          </section>

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/10
                     sticky top-8 h-fit max-h-[calc(100vh-4rem)] overflow-y-auto
                     scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          >
            <div className="flex items-center space-x-4 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-accent-mint to-accent-powder
                         flex items-center justify-center"
              >
                <Image
                  src="/images/playlist.png"
                  alt="Playlist"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Your Generated Playlist
              </h3>
            </div>
            
            <MusicRecommendations selectedMood="Happy" />
          </motion.section>
        </motion.div>
      </main>
    </div>
  )
} 