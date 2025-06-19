const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'

interface SpotifyTrack {
  id: string
  uri: string
  name: string
  artists: Array<{ name: string }>
  album: {
    name: string
    images: Array<{ url: string }>
  }
}

export async function createMoodPlaylist(
  accessToken: string,
  userId: string,
  mood: string,
  language?: string,
  artist?: string
) {
  try {
    // Create a new playlist
    const playlistResponse = await fetch(
      `${SPOTIFY_API_BASE}/users/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${mood} Mood`,
          description: `A playlist created based on ${mood} mood`,
          public: false,
        }),
      }
    )

    const playlist = await playlistResponse.json()

    // Search for tracks based on mood
    let searchQuery = `mood:${mood}`
    if (language) searchQuery += ` language:${language}`
    if (artist) searchQuery += ` artist:${artist}`

    const searchResponse = await fetch(
      `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(
        searchQuery
      )}&type=track&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const searchResults = await searchResponse.json()
    const tracks = searchResults.tracks.items as SpotifyTrack[]
    const trackUris = tracks.map((track) => track.uri)

    // Add tracks to the playlist
    if (trackUris.length > 0) {
      await fetch(`${SPOTIFY_API_BASE}/playlists/${playlist.id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      })
    }

    return {
      playlistId: playlist.id,
      tracks: tracks.map((track) => ({
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(', '),
        albumName: track.album.name,
        albumImage: track.album.images[0]?.url,
      })),
    }
  } catch (error) {
    console.error('Error creating mood playlist:', error)
    throw error
  }
} 