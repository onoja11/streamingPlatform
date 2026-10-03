import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
                    role: response.data.is_admin === true ? 'admin' : 'guest' 
                });
            } catch (error) {
                console.error("Session invalid", error);
                localStorage.removeItem('auth_token');
            }
        }
        setIsLoading(false);
    };
    restoreSession();
  }, []);

  const playSong = (song, songList = []) => {
    setCurrentSong(song);
    setIsPlaying(true);

    if (songList && songList.length > 0) {
      setQueue(songList);
      const index = songList.findIndex(s => s.id === song.id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    } else {
      setQueue(prev => (prev.length > 0 ? prev : [song]));
      setCurrentIndex(0);
    }
  };

  const playNext = () => {
    if (queue.length > 0) {
      const nextIndex = (currentIndex + 1) % queue.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (queue.length > 0) {
      // Fix: Safely loop back to the end of the queue or stop at 0 if preferred
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <PlayerContext.Provider value={{ 
        currentSong, 
        isPlaying, 
        playSong, 
        playNext, 
        playPrevious, 
        togglePlay, 
        user, 
        setUser,
        isSearchOpen, 
        openSearch, 
        closeSearch,
        isLoading 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};