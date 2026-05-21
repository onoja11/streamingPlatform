import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Clock, ArrowLeft, Calendar, User, Music } from 'lucide-react'; // Added Music
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';
import CoverImage from '../components/CoverImage'; // Use your robust component

const AlbumDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, currentSong, isPlaying } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await api.get(`/albums/${id}`);
        setAlbum(res.data);
      } catch (error) {
        console.error("Failed to load album", error);
        navigate('/home');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlbum();
  }, [id, navigate]);

  if (isLoading) return <div className="p-8 text-white">Loading Album...</div>;
  if (!album) return null;

  return (
    <div className="md:p-8 pb-24 min-h-screen bg-gradient-to-b from-purple-900/20 to-black">
      
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} /> Back
      </button>

      {/* Album Header */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
        {/* Album Art - Using CoverImage component */}
        <div className="w-48 h-48 md:w-64 md:h-64 shadow-2xl rounded-xl overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            <CoverImage 
                src={album.album_cover_url} 
                alt={album.title} 
                className="w-full h-full object-cover"
                icon="album"
            />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-end text-center md:text-left">
            <h5 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-2">Album</h5>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{album.title}</h1>
            
            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-300 text-sm">
                <div className="flex items-center gap-1">
                    <User size={16} /> 
                    <span className="font-bold">{album.artist}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar size={16} /> 
                    <span>{album.year}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Music size={16} /> 
                    <span>{album.songs?.length || 0} Songs</span>
                </div>
            </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="bg-[#121212]/50 rounded-xl p-2 md:p-6 backdrop-blur-sm">
        {album.songs?.length > 0 ? (
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-gray-400 text-xs border-b border-white/10">
                        <th className="pb-3 pl-4 w-12">#</th>
                        <th className="pb-3">Title</th>
                        <th className="pb-3 hidden md:table-cell">Artist</th>
                        <th className="pb-3 pr-4 text-right"><Clock size={16} className="inline" /></th>
                    </tr>
                </thead>
                <tbody>
                    {album.songs.map((song, index) => {
                        const isCurrent = currentSong?.id === song.id;
                        return (
                            <tr 
                                key={song.id} 
                                onClick={() => playSong(song)}
                                className={`group hover:bg-white/10 cursor-pointer transition-colors ${isCurrent ? 'bg-white/10' : ''}`}
                            >
                                <td className="py-3 pl-4 text-gray-400 text-sm">
                                    {isCurrent && isPlaying ? (
                                        <div className="text-purple-500 font-bold">▶</div>
                                    ) : (
                                        <>
                                            <span className="group-hover:hidden">{index + 1}</span>
                                            <Play size={12} className="hidden group-hover:block text-white" />
                                        </>
                                    )}
                                </td>
                                <td className={`py-3 font-bold ${isCurrent ? 'text-purple-400' : 'text-white'}`}>
                                    {song.title}
                                </td>
                                <td className="py-3 text-gray-400 text-sm hidden md:table-cell">
                                    {song.artist}
                                </td>
                                <td className="py-3 pr-4 text-right text-gray-400 text-sm">
                                    3:45
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        ) : (
            <div className="text-center py-10 text-gray-500">No songs added yet.</div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;