
import React from 'react';
import { Play, Pause } from 'lucide-react';
import { SongWithFavorite } from '@/hooks/useMusicData';
import FavoriteButton from './FavoriteButton';

interface SongCardProps {
  song: SongWithFavorite;
  isPlaying: boolean;
  isCurrentSong: boolean;
  onPlay: () => void;
  onToggleFavorite: () => void;
}

const SongCard: React.FC<SongCardProps> = ({
  song,
  isPlaying,
  isCurrentSong,
  onPlay,
  onToggleFavorite,
}) => {
  return (
    <div className="song-card bg-white dark:bg-music-DEFAULT rounded-lg overflow-hidden shadow-md transition-all duration-300">
      <div className="relative aspect-square group">
        <img
          src={song.coverArt}
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
          <button
            onClick={onPlay}
            className="opacity-0 group-hover:opacity-100 bg-white text-black rounded-full p-3 transform scale-90 hover:scale-100 transition-all duration-300"
            aria-label={isPlaying && isCurrentSong ? "Pause" : "Play"}
          >
            {isPlaying && isCurrentSong ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="absolute bottom-2 right-2">
          <FavoriteButton
            isFavorite={song.isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{song.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{song.artist}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-500">{song.album}</span>
          <span className="text-xs text-gray-500 dark:text-gray-500">{song.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
