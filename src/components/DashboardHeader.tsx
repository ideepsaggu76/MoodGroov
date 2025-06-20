'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePictureModal from './ProfilePictureModal'

export default function DashboardHeader() {
  const { data: session } = useSession()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [customProfilePicture, setCustomProfilePicture] = useState<string | null>(null)

  return (
    <header className="bg-black/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/mainlogo.png"
              alt="MoodGroove"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-white">MoodGroove</h1>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/dashboard" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Profile
              </Link>
            </nav>

            <div className="flex items-center space-x-3">              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="relative group"
              >                {(customProfilePicture || session?.user?.image) ? (
                  <Image
                    src={customProfilePicture || session?.user?.image || '/images/mainlogo.png'}
                    alt={session?.user?.name || 'Profile'}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-green-500 transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-600 group-hover:bg-gray-500 transition-colors" />
                )}
                <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white">Edit</span>
                </div>
              </button>
              <span className="text-white font-medium">
                {session?.user?.name || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProfilePictureModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpload={(file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setCustomProfilePicture(reader.result as string);
            setIsProfileModalOpen(false);
          };
          reader.readAsDataURL(file);
        }}
        currentImage={(customProfilePicture || session?.user?.image) || undefined}
      />
    </header>
  )
} 