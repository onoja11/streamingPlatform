import React, { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import api from '../api/axios';
import CoverImage from '../components/CoverImage'; // Import

const Library = () => {
  const { playSong, user } = usePlayer();
  const [librarySongs, setLibrarySongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.isLoggedIn) {
        setLoading(true);
        api.get('/libraries').then(res => setLibrarySongs(res.data)).finally(() => setLoading(false));
    }
  }, [user.isLoggedIn]);

  const handleRemove = async (e, libraryId) => {
    e.stopPropagation();
    if (!window.confirm("Remove this song?")) return;
    try {
        await api.delete(`/libraries/${libraryId}`);
        setLibrarySongs(prev => prev.filter(item => item.id !== libraryId));
    } catch (err) { console.error(err); }
  };

  if (!user.isLoggedIn) return <div className="p-8 text-center text-gray-400">Please log in to view your library.</div>;

  return (
    <div className="md:p-8 pb-32">
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl md:text-4xl font-bold text-white mb-1">My Library</h1></div>
      <div className="flex gap-3 mb-6"><button className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm">Songs</button></div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {loading ? <div className="text-gray-500">Loading...</div> : librarySongs.length === 0 ? <div className="text-gray-500">Your library is empty.</div> : (
            <div className="bg-[#181818] rounded-xl overflow-hidden">
                {librarySongs.map((item, index) => {
                    const song = item.song; 
                    if (!song || !song.music_file_url) return null; 

                    return (
                        <div key={item.id} onClick={() => playSong(song)} className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 group">
                            <div className="w-6 text-center text-gray-500 font-mono text-xs hidden md:block">{index + 1}</div>
                            
                            {/* USE COVER IMAGE COMPONENT */}
                            <CoverImage src={song.music_cover_url} className="w-10 h-10 rounded object-cover" icon="music" />
                            
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold text-sm truncate">{song.title}</h4>
                                <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                            </div>
                            <div className="flex items-center gap-4 px-2">
                                <button onClick={(e) => handleRemove(e, item.id)} className="hover:scale-110 transition-transform">
                                    <Heart size={20} className="text-purple-500 fill-purple-500 hover:text-white hover:fill-transparent" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    </div>
  );
};

export default Library;