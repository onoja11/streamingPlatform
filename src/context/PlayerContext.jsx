import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // 1. ADD Loading State
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({
    name: 'Guest',
    email: '',
    role: 'guest', 
    isLoggedIn: false,
    isPremium: false 
  });

  useEffect(() => {
    const restoreSession = async () => {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
            try {
                const response = await api.get('/user');
                
                setUser({
                    ...response.data,
                    isLoggedIn: true,
                    // 2. Map is_admin to role
                    role: response.data.is_admin === true ? 'admin' : 'guest' 
                });
            } catch (error) {
                console.error("Session invalid", error);
                localStorage.removeItem('auth_token');
            }
        }
        // 3. Stop loading when done
        setIsLoading(false);
    };

    restoreSession();
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <PlayerContext.Provider value={{ 
        currentSong, isPlaying, playSong, togglePlay, 
        user, setUser,
        isSearchOpen, openSearch, closeSearch,
        isLoading // 4. Export loading state
    }}>
      {children}
    </PlayerContext.Provider>
  );
};