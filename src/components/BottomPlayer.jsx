import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import CoverImage from './CoverImage';

const BottomPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = usePlayer();
  const audioRef = useRef(new Audio());
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);

  // Sync Audio Element with State
  useEffect(() => {
    const audio = audioRef.current;
    
    if (currentSong) {
      audio.src = currentSong.music_file_url;
      audio.volume = volume;
      if (isPlaying) audio.play().catch(console.error);
    }
    
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) audioRef.current.play().catch(console.error);
    else audioRef.current.pause();
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="fixed z-50 bottom-[68px] md:bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-purple-900/30 backdrop-blur-xl px-4 py-2 md:py-0 md:h-24 flex flex-col md:flex-row items-center justify-between">
      
      {/* Progress Bar (Mobile & Desktop) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 cursor-pointer group">
        <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>

      {/* 1. Song Info */}
      <div className="flex items-center gap-3 w-full md:w-[30%]">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
          <CoverImage src={currentSong.music_cover_url} className="w-full h-full" icon="music" />
        </div>
        <div className="min-w-0">
          <h4 className="text-white text-sm font-bold truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* 2. Controls */}
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-white transition-colors"><SkipBack size={20} /></button>
        <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
        >
            {isPlaying ? <Pause size={20} fill="black" className="text-black" /> : <Play size={20} fill="black" className="ml-1 text-black" />}
        </button>
        <button className="text-gray-400 hover:text-white transition-colors"><SkipForward size={20} /></button>
      </div>

      {/* 3. Desktop Extras */}
      <div className="hidden md:flex items-center justify-end w-[30%] gap-3 text-gray-400">
        <Volume2 size={18} />
        <input 
            type="range" min="0" max="1" step="0.1" value={volume}
            onChange={(e) => {
                const vol = parseFloat(e.target.value);
                setVolume(vol);
                audioRef.current.volume = vol;
            }}
            className="w-24 accent-purple-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BottomPlayer;