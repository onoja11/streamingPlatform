import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/150';
    if (path.startsWith('http')) return path;
    return `http://evy_max_api.test/storage/${path}`;
};

const getAudioUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://evy_max_api.test/storage/${path}`;
};

const BottomPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = usePlayer();
  const audioRef = useRef(null);

  // Handle Song Change
  useEffect(() => {
    if (audioRef.current) {
        if (currentSong) {
            audioRef.current.src = getAudioUrl(currentSong.music_file_url);
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play error:", e));
            }
        } else {
            audioRef.current.pause();
        }
    }
  }, [currentSong]);

  // Handle Play/Pause Toggle
  useEffect(() => {
    if (audioRef.current && currentSong) {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Play error:", e));
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

  return (
    <div className="fixed z-40 bottom-[68px] left-2 right-2 rounded-xl border border-white/10 md:bottom-0 md:left-0 md:right-0 md:rounded-none md:border-t md:border-purple-900/30 md:border-x-0 md:border-b-0 h-16 md:h-24 bg-[#1a1a1a] md:bg-[#0a0a0a] backdrop-blur-lg bg-opacity-95 md:bg-opacity-95 px-4 md:px-6 flex items-center justify-between shadow-2xl">
      
      {/* HIDDEN AUDIO ELEMENT */}
      <audio ref={audioRef} />

      {/* 1. Song Info */}
      <div className="flex items-center gap-3 w-full md:w-[30%] overflow-hidden">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
          <img src={getImageUrl(currentSong.music_cover_url)} alt="art" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-bold truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* 2. Controls (Desktop) */}
      <div className="hidden md:flex flex-col items-center w-[40%] gap-2">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white"><SkipBack size={20} fill="currentColor" /></button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 hover:scale-110 transition-all shadow-lg"
          >
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-white"><SkipForward size={20} fill="currentColor" /></button>
        </div>
      </div>

      {/* 3. Controls (Mobile) */}
      <div className="flex md:hidden items-center gap-3 ml-2">
          <button 
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
          >
             {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
          </button>
      </div>

      {/* 4. Volume (Desktop) */}
      <div className="hidden md:flex items-center justify-end w-[30%] gap-2">
        <Volume2 size={18} className="text-gray-400" />
        <div className="w-24 h-1 bg-gray-800 rounded-full">
           <div className="h-full bg-gray-400 w-2/3 hover:bg-purple-500"></div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;