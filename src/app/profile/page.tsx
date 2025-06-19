import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import DashboardHeader from '@/components/DashboardHeader'

export default async function ProfilePage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/50 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              {session.user?.image ? (
                <div className="relative">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'Profile'}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-green-500"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full
                             hover:bg-green-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-600" />
              )}
              
              <h1 className="text-3xl font-bold">
                {session.user?.name || 'User Profile'}
              </h1>
              <p className="text-gray-400">{session.user?.email}</p>
            </div>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-medium">Spotify Connection</h3>
                      <p className="text-sm text-gray-400">Connected to Spotify</p>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-green-500" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-400">Receive playlist updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer 
                                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                  after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                                  peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-green-500">0</h3>
                    <p className="text-sm text-gray-400">Playlists Created</p>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-green-500">0</h3>
                    <p className="text-sm text-gray-400">Songs Added</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 