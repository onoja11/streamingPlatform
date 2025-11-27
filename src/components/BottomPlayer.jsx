import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, X } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const BottomPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = usePlayer();

  if (!currentSong) return null;

  return (
    /* Responsive Positioning: 
       Mobile: bottom-16 (to sit above TabBar), left-2, right-2, rounded-lg
       Desktop: bottom-0, left-0, right-0, square corners
    */
    <div className="fixed z-40 
      bottom-[68px] left-2 right-2 rounded-xl border border-white/10
      md:bottom-0 md:left-0 md:right-0 md:rounded-none md:border-t md:border-purple-900/30 md:border-x-0 md:border-b-0
      h-16 md:h-24 
      bg-[#1a1a1a] md:bg-[#0a0a0a] 
      backdrop-blur-lg bg-opacity-95 md:bg-opacity-95
      px-4 md:px-6 
      flex items-center justify-between shadow-2xl"
    >
      
      {/* 1. Song Info */}
      <div className="flex items-center gap-3 w-full md:w-[30%] overflow-hidden">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
          <img src={currentSong.image} alt="art" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-bold truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
        </div>
        {/* Mobile Heart (Hidden on desktop, shown here for quick access) */}
        <button className="md:hidden text-gray-400 hover:text-purple-400">
            <Heart size={20} />
        </button>
      </div>

      {/* 2. Controls (Desktop Only - Expanded) */}
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
        <div className="w-full flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span>1:45</span>
          <div className="flex-1 h-1 bg-gray-800 rounded-full cursor-pointer overflow-hidden">
            <div className="h-full bg-purple-500 w-1/3 relative"></div>
          </div>
          <span>3:30</span>
        </div>
      </div>

      {/* 3. Controls (Mobile Only - Simplified) */}
      <div className="flex md:hidden items-center gap-3 ml-2">
          <button 
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
          >
             {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
          </button>
      </div>

      {/* 4. Volume (Desktop Only) */}
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