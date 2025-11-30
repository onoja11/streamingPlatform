import React from 'react';
import { Play, Pause, Plus } from 'lucide-react'; 
import { usePlayer } from '../context/PlayerContext';
import api from '../api/axios';

const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/150';
    if (path.startsWith('http')) return path;
    return `http://evy_max_api.test/storage/${path}`;
};

const SongCard = ({ song }) => {
  const { playSong, user, currentSong, isPlaying } = usePlayer();
  const isActive = isPlaying && currentSong?.id === song.id;

  const handleAddToLibrary = async (e) => {
    e.stopPropagation();
    
    if (!user.isLoggedIn) {
        alert("Please Log In to add songs.");
        return;
    }

    try {
        // Assuming your LibraryController store method expects 'song_id'
        await api.post('/libraries', { song_id: song.id });
        alert("Added to Library!");
    } catch (error) {
        console.error("Add to library failed", error);
        alert("Could not add to library. (Maybe it's already there?)");
    }
  };

  return (
    <div 
      onClick={() => playSong(song)}
      className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-all duration-300 group cursor-pointer relative"
    >
      <div className="aspect-square bg-gray-800 rounded-lg mb-4 overflow-hidden relative shadow-lg">
        {/* Fix Image Source */}
        <img 
            src={getImageUrl(song.music_cover_url)} 
            alt={song.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
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

      <div className="flex justify-between items-start">
        <div className="overflow-hidden flex-1">
             <h3 className={`font-bold truncate ${isActive ? 'text-purple-400' : 'text-white'}`}>
                {song.title}
             </h3>
             <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        </div>
        
        <div className="flex items-center gap-2 ml-2">
            <button 
                onClick={handleAddToLibrary}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Add to Library"
            >
                <Plus size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;