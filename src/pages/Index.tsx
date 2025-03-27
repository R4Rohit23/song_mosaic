
import React from 'react';
import Header from '@/components/Header';
import SongCard from '@/components/SongCard';
import MusicPlayer from '@/components/MusicPlayer';
import { useMusicData } from '@/hooks/useMusicData';

const Index = () => {
  const {
    currentSong,
    isPlaying,
    getSongsWithFavoriteStatus,
    toggleFavorite,
    playSong,
    togglePlay,
  } = useMusicData();

  const songsWithFavorites = getSongsWithFavoriteStatus();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Songs</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {songsWithFavorites.slice(0, 5).map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={isPlaying}
                  isCurrentSong={currentSong?.id === song.id}
                  onPlay={() => {
                    if (currentSong?.id === song.id) {
                      togglePlay();
                    } else {
                      playSong(song);
                    }
                  }}
                  onToggleFavorite={() => toggleFavorite(song.id)}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">All Songs</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {songsWithFavorites.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={isPlaying}
                  isCurrentSong={currentSong?.id === song.id}
                  onPlay={() => {
                    if (currentSong?.id === song.id) {
                      togglePlay();
                    } else {
                      playSong(song);
                    }
                  }}
                  onToggleFavorite={() => toggleFavorite(song.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {currentSong && (
        <MusicPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          isFavorite={songsWithFavorites.find(s => s.id === currentSong.id)?.isFavorite || false}
          onTogglePlay={togglePlay}
          onToggleFavorite={() => currentSong && toggleFavorite(currentSong.id)}
        />
      )}
    </div>
  );
};

export default Index;
