
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  // Helper to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <header className="bg-white dark:bg-music-DEFAULT border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-music-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Mosaic</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-music-primary border-b-2 border-music-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-music-primary dark:hover:text-music-primary'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-1" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
