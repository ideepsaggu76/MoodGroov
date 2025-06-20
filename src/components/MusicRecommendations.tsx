import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
}

const moodToGenres: Record<string, string[]> = {
  'Happy': ['pop', 'dance', 'happy'],
  'Sad': ['sad', 'acoustic', 'soul'],
  'Energetic': ['edm', 'rock', 'workout'],
  'Chill': ['chill', 'ambient', 'sleep'],
  'Romantic': ['romance', 'r-n-b', 'soul'],
};

const moodToColors = {
  'Happy': 'from-yellow-400 to-orange-500',
  'Sad': 'from-blue-400 to-purple-500',
  'Energetic': 'from-red-400 to-pink-500',
  'Chill': 'from-green-400 to-teal-500',
  'Romantic': 'from-pink-400 to-red-500',
};

export default function MusicRecommendations({ selectedMood }: { selectedMood: string }) {
  const { data: session } = useSession();
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!session?.user?.accessToken) return;
      
      setLoading(true);
      try {
        const genres = moodToGenres[selectedMood]?.join(',') || '';
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${genres}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch recommendations');

        const data = await response.json();
        const tracks: Track[] = data.tracks.map((track: any) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          albumArt: track.album.images[0]?.url || '',
        }));

        setRecommendations(tracks);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [selectedMood, session]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-4">
          {selectedMood} Music Recommendations
        </h3>
        
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 rounded-lg p-4 animate-pulse"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded" />
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-white/10 rounded" />
                    <div className="h-3 w-24 bg-white/10 rounded" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Actual recommendations
            <div className="grid gap-4">
              {recommendations.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${moodToColors[selectedMood]} bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all`}
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={track.albumArt}
                      alt={track.name}
                      width={48}
                      height={48}
                      className="rounded shadow-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{track.name}</h4>
                      <p className="text-sm text-white/70">{track.artist}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
