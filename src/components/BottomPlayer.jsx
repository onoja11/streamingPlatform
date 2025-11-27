import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const BottomPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="h-24 bg-[#0a0a0a] border-t border-purple-900/30 px-6 flex items-center justify-between z-50 fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-opacity-95">
      
      {/* Song Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <div className="w-14 h-14 bg-gray-800 rounded-md overflow-hidden shadow-[0_0_15px_rgba(147,51,234,0.3)]">
          <img src={currentSong.image} alt="art" className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-white text-sm font-bold truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs">{currentSong.artist}</p>
        </div>
        <button className="text-gray-400 hover:text-purple-400 ml-2">
            <Heart size={18} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-[40%] gap-2">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white"><SkipBack size={20} fill="currentColor" /></button>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 hover:scale-110 transition-all shadow-lg shadow-purple-900/50"
          >
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-1" />}
          </button>
          
          <button className="text-gray-400 hover:text-white"><SkipForward size={20} fill="currentColor" /></button>
        </div>

        <div className="w-full flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span>1:45</span>
          <div className="flex-1 h-1 bg-gray-800 rounded-full cursor-pointer overflow-hidden">
            <div className="h-full bg-purple-500 w-1/3 relative shadow-[0_0_10px_#a855f7]"></div>
          </div>
          <span>3:30</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end w-[30%] gap-2">
        <Volume2 size={18} className="text-gray-400" />
        <div className="w-24 h-1 bg-gray-800 rounded-full">
           <div className="h-full bg-gray-400 w-2/3 hover:bg-purple-500"></div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;