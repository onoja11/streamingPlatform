import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // NEW: Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [user, setUser] = useState({
    name: 'Guest',
    isLoggedIn: false,
    isPremium: false 
  });

  const playSong = (song) => {
    if (!song.isFree && !user.isPremium) {
      alert("This is a Premium song. Please subscribe to listen!");
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  // NEW: Helper functions for Search
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <PlayerContext.Provider value={{ 
        currentSong, isPlaying, playSong, togglePlay, 
        user, setUser,
        isSearchOpen, openSearch, closeSearch // Export these
    }}>
      {children}
    </PlayerContext.Provider>
  );
};