import React from 'react';
import { Play, Pause, Plus, Download } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import api from '../api/axios';
import CoverImage from './CoverImage'; 

const SongCard = ({ song }) => {
  const { playSong, user, currentSong, isPlaying } = usePlayer();
  const isActive = isPlaying && currentSong?.id === song.id;

  // Handle Download with Authentication Guard
  const handleDownload = async (e) => {
    e.stopPropagation();

    // 1. Authentication Guard
    if (!user.isLoggedIn) {
        alert("Please Log In to download this song.");
        return;
    }

    try {
      // 2. Fetch the file as a blob to trigger download
      const response = await fetch(song.music_file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${song.title} - ${song.artist}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: Open in new tab
      window.open(song.music_file_url, '_blank');
    }
  };

  // Handle Add to Library
  const handleAddToLibrary = async (e) => {
    e.stopPropagation();
    if (!user.isLoggedIn) {
        alert("Please Log In to add songs.");
        return;
    }
    try {
        await api.post('/libraries', { song_id: song.id });
        alert("Added to Library!");
    } catch (error) {
        alert("Could not add to library.");
    }
  };

  return (
    <div 
      onClick={() => playSong(song)}
      className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-all duration-300 group cursor-pointer relative"
    >
      {/* Cover Art Section */}
      <div className="aspect-square rounded-lg mb-4 overflow-hidden relative shadow-lg">
        <CoverImage 
            src={song.music_cover_url} 
            alt={song.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            icon="music"
        />
        
        {/* Play/Pause Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'}`}>
             <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${isActive ? 'bg-purple-500' : 'bg-purple-600'}`}>
                {isActive ? (
                    <Pause size={20} fill="white" className="text-white" />
                ) : (
                    <Play size={20} fill="white" className="ml-1 text-white" />
                )}
             </div>
        </div>
      </div>

      {/* Info and Actions Section */}
      <div className="flex justify-between items-start">
        <div className="overflow-hidden flex-1">
             <h3 className={`font-bold truncate ${isActive ? 'text-purple-400' : 'text-white'}`}>
                {song.title}
             </h3>
             <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        </div>
        
        {/* Buttons Group */}
        <div className="flex flex-col gap-3 ml-2">
            <button 
                onClick={handleAddToLibrary}
                className="text-gray-400 hover:text-white transition-colors"
                title="Add to Library"
            >
                <Plus size={18} />
            </button>
            <button 
                onClick={handleDownload}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                title="Download Song"
            >
                <Download size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;