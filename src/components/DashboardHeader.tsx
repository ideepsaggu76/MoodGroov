import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardHeader() {
  const { data: session } = useSession()

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

            <div className="flex items-center space-x-3">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'Profile'}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-green-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-600" />
              )}
              <span className="text-white font-medium">
                {session?.user?.name || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 