
import { useState, useEffect } from 'react';

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
};

export type SongWithFavorite = Song & {
  isFavorite: boolean;
};

// Mock data for the application
const initialSongs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    coverArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    duration: '3:14',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
    coverArt: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Stay',
    artist: 'Kid Laroi ft. Justin Bieber',
    album: 'F*CK LOVE 3: OVER YOU',
    duration: '2:21',
    coverArt: 'https://images.unsplash.com/photo-1507808973436-a4ed7b5e87c9?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Montero',
    artist: 'Lil Nas X',
    album: 'Montero',
    duration: '2:17',
    coverArt: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Easy On Me',
    artist: 'Adele',
    album: '30',
    duration: '3:44',
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:35',
    coverArt: 'https://images.unsplash.com/photo-1501320064676-902dd161c0a0?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: '2:58',
    coverArt: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '9',
    title: 'Butter',
    artist: 'BTS',
    album: 'Butter',
    duration: '2:44',
    coverArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '10',
    title: 'Peaches',
    artist: 'Justin Bieber ft. Daniel Caesar, Giveon',
    album: 'Justice',
    duration: '3:18',
    coverArt: 'https://images.unsplash.com/photo-1482442120256-9c03866de390?q=80&w=300&auto=format&fit=crop',
  },
];

export const useMusicData = () => {
  // Get favorites from local storage or initialize to empty array
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoritesSongs');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('favoritesSongs', JSON.stringify(favorites));
  }, [favorites]);

  // Add a song to favorites
  const addToFavorites = (songId: string) => {
    setFavorites((prev) => [...prev, songId]);
  };

  // Remove a song from favorites
  const removeFromFavorites = (songId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== songId));
  };

  // Toggle favorite status
  const toggleFavorite = (songId: string) => {
    if (favorites.includes(songId)) {
      removeFromFavorites(songId);
    } else {
      addToFavorites(songId);
    }
  };

  // Get all songs with their favorite status
  const getSongsWithFavoriteStatus = (): SongWithFavorite[] => {
    return songs.map((song) => ({
      ...song,
      isFavorite: favorites.includes(song.id),
    }));
  };

  // Get only favorite songs
  const getFavoriteSongs = (): SongWithFavorite[] => {
    return songs
      .filter((song) => favorites.includes(song.id))
      .map((song) => ({
        ...song,
        isFavorite: true,
      }));
  };

  // Search songs
  const searchSongs = (query: string): SongWithFavorite[] => {
    if (!query.trim()) return getSongsWithFavoriteStatus();

    const lowercaseQuery = query.toLowerCase();
    return songs
      .filter(
        (song) =>
          song.title.toLowerCase().includes(lowercaseQuery) ||
          song.artist.toLowerCase().includes(lowercaseQuery) ||
          song.album.toLowerCase().includes(lowercaseQuery)
      )
      .map((song) => ({
        ...song,
        isFavorite: favorites.includes(song.id),
      }));
  };

  // Play a song
  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  // Pause the current song
  const pauseSong = () => {
    setIsPlaying(false);
  };

  // Resume the current song
  const resumeSong = () => {
    if (currentSong) {
      setIsPlaying(true);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  return {
    songs,
    currentSong,
    isPlaying,
    toggleFavorite,
    getSongsWithFavoriteStatus,
    getFavoriteSongs,
    searchSongs,
    playSong,
    pauseSong,
    resumeSong,
    togglePlay,
  };
};
