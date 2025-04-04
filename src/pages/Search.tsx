
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import SongCard from '@/components/SongCard';
import MusicPlayer from '@/components/MusicPlayer';
import { useMusicData } from '@/hooks/useMusicData';

const Search = () => {
  const {
    currentSong,
    isPlaying,
    searchSongs,
    toggleFavorite,
    playSong,
    togglePlay,
  } = useMusicData();

  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = searchSongs(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {searchQuery ? 'Search Results' : 'All Songs'}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {searchResults.length} {searchResults.length === 1 ? 'song' : 'songs'}
              </span>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map((song) => (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No songs found matching "{searchQuery}"
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {currentSong && (
        <MusicPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          isFavorite={searchResults.find(s => s.id === currentSong.id)?.isFavorite || false}
          onTogglePlay={togglePlay}
          onToggleFavorite={() => currentSong && toggleFavorite(currentSong.id)}
        />
      )}
    </div>
  );
};

export default Search;
