import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createMoodPlaylist } from '@/lib/spotify'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user?.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { mood, language, artist } = await request.json()

    if (!mood) {
      return NextResponse.json(
        { error: 'Mood is required' },
        { status: 400 }
      )
    }

    const result = await createMoodPlaylist(
      session.user.accessToken,
      session.user.id,
      mood,
      language,
      artist
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in playlist creation:', error)
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    )
  }
} 