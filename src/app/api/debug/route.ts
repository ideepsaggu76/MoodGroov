import { NextResponse } from 'next/server'

export async function GET() {
  const spotifyCallback = "https://moodgroov-7ff0d88d9dcc.herokuapp.com/api/auth/callback/spotify"
  
  return NextResponse.json({
    spotify_callback: spotifyCallback,
    current_url: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    callback_url: process.env.NEXTAUTH_URL + '/api/auth/callback/spotify',
    NODE_ENV: process.env.NODE_ENV
  })
}
