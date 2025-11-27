import React from 'react';
import { Play, Lock, Pause } from 'lucide-react'; // Added Pause icon
import { usePlayer } from '../context/PlayerContext';

const SongCard = ({ song }) => {
  // 1. Destructure isPlaying and currentSong
  const { playSong, user, currentSong, isPlaying } = usePlayer();
  
  const isLocked = !song.isFree && !user.isPremium;
  
  // 2. Check if THIS specific song is the one currently playing
  const isActive = isPlaying && currentSong?.id === song.id;

  return (
    <div 
      onClick={() => playSong(song)}
      className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-all duration-300 group cursor-pointer relative"
    >
      <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden relative shadow-lg">
        <img src={song.image} alt={song.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        {/* Play or Lock Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'}`}>
           {isLocked ? (
             <div className="w-12 h-12 bg-black/80 rounded-full flex items-center justify-center border border-yellow-500">
                <Lock size={20} className="text-yellow-500" />
             </div>
           ) : (
             <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${isActive ? 'bg-purple-500' : 'bg-purple-600'}`}>
                {/* Show Pause if active, otherwise Play */}
                {isActive ? (
                    <Pause size={20} fill="white" className="text-white" />
                ) : (
                    <Play size={20} fill="white" className="ml-1 text-white" />
                )}
             </div>
           )}
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="overflow-hidden">
             {/* 3. Use isActive to color the text purple if this song is playing */}
             <h3 className={`font-bold truncate ${isActive ? 'text-purple-400' : 'text-white'}`}>
                {song.title}
             </h3>
             <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        </div>
        {!song.isFree && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-yellow-500 uppercase tracking-wider flex-shrink-0 ml-2">
                Paid
            </div>
        )}
      </div>
    </div>
  );
};

export default SongCard;