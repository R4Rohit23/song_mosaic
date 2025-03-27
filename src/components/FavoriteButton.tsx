
import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggleFavorite }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite();
      }}
      className={`rounded-full p-2 transition-all duration-300 ${
        isFavorite 
          ? 'bg-white bg-opacity-90 text-red-500' 
          : 'bg-black bg-opacity-30 text-white hover:bg-opacity-50'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`h-4 w-4 ${
          isFavorite ? 'fill-current animate-scale-in' : ''
        }`}
      />
    </button>
  );
};

export default FavoriteButton;
