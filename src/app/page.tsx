'use client'

import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    title: 'Mood-Based Discovery',
    description: "Tell us how you feel, and we'll create the perfect playlist to match your mood.",    icon: '/images/sync.png'
  },
  {
    title: 'AI-Powered Curation',
    description: 'Our smart algorithms understand music on a deeper level to find songs that truly resonate.',
    icon: '/images/anlytics.png'
  },
  {
    title: 'Seamless Integration',
    description: 'Connect with Spotify and start enjoying personalized playlists instantly.',
    icon: '/images/spotify.png'
  },
]

export default function Home() {
  return (    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-[#FFD6D6] overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-overlay filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Logo and Hero section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >              <Image
                src="/images/mainlogo.png"
                alt="MoodGroove"
                width={250}
                height={75}
                className="mx-auto w-[250px] h-auto"
                priority
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8"
            >
              Your personal music companion that understands your mood
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => signIn('spotify')}
              className="bg-[#1DB954] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1ed760] transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/20"
            >
              Connect with Spotify
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={64}
                    height={64}
                    className="mx-auto w-16 h-16 object-contain"
                  />
                </div>                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
