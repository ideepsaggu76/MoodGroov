<<<<<<< HEAD
# MoodGroove - Mood-Based Playlist Generator

MoodGroove is a web application that creates personalized Spotify playlists based on your mood. Using the Spotify API, it generates playlists that match your current emotional state and musical preferences.

## Features

- 🎵 Spotify Authentication
- 🎭 Mood-based playlist generation
- 🌍 Language preferences
- 🎨 Artist preferences
- 👤 User profile management
- 🎨 Modern, responsive UI with animations

## Prerequisites

- Node.js 18+ installed
- A Spotify Developer account
- Spotify API credentials (Client ID and Client Secret)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd moodgroove
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Spotify API credentials:
   ```
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Spotify API Credentials

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Set the redirect URI to `http://localhost:3000/api/auth/callback/spotify`
4. Copy the Client ID and Client Secret to your `.env.local` file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
=======
# MoodGroov
>>>>>>> bfc5ec2bbc168d94266c5fd80924caf1a1849a1b
