
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Song } from '@/hooks/useMusicData';
import FavoriteButton from './FavoriteButton';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  isFavorite: boolean;
  onTogglePlay: () => void;
  onToggleFavorite: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentSong,
  isPlaying,
  isFavorite,
  onTogglePlay,
  onToggleFavorite,
}) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  // Simulate progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 0.5;
          return newProgress >= 100 ? 0 : newProgress;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong]);

  // Reset progress when song changes
  useEffect(() => {
    setProgress(0);
  }, [currentSong]);

  if (!currentSong) {
    return null;
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Convert song duration string to seconds for calculation
  const durationParts = currentSong.duration.split(':');
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-music-DEFAULT bg-opacity-95 dark:bg-opacity-95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 py-3 px-4 transition-transform duration-300 animate-slide-up z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Song info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 relative">
            <img
              src={currentSong.coverArt}
              alt={currentSong.title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse-subtle' : ''}`}
            />
          </div>
          <div className="truncate">
            <h4 className="font-medium text-gray-900 dark:text-white truncate">{currentSong.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{currentSong.artist}</p>
          </div>
          <div>
            <FavoriteButton isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
          </div>
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-300 hover:text-music-primary dark:hover:text-music-primary transition-colors">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={onTogglePlay}
              className="bg-music-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90 transition-all"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-music-primary dark:hover:text-music-primary transition-colors">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          <div className="w-full max-w-md mt-2 flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
              {formatTime(currentSeconds)}
            </span>
            <div className="music-player-progress flex-grow">
              <div className="music-player-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
              {currentSong.duration}
            </span>
          </div>
        </div>

        {/* Volume control */}
        <div className="flex items-center justify-end space-x-4">
          <button
            onClick={toggleMute}
            className="text-gray-600 dark:text-gray-300 hover:text-music-primary dark:hover:text-music-primary transition-colors"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          <div className="w-24 music-player-progress">
            <div
              className="music-player-progress-bar"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
