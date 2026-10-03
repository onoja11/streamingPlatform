import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Clock, ArrowLeft, Calendar, User, Music, Sparkles } from 'lucide-react';
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';
import CoverImage from '../components/CoverImage';

const AlbumDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await api.get(`/albums/${id}`);
        const albumData = res.data.data || res.data;
        setAlbum(albumData);
      } catch (error) {
        console.error("Failed to load album", error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlbum();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-purple-400 font-medium">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading immersive experience...</span>
        </div>
      </div>
    );
  }

  if (!album) return <div className="p-8 text-white text-center">Album not found.</div>;

  return (
    <div className="min-h-screen text-white relative pb-32 overflow-hidden">
      
      {/* Background Cinematic Atmosphere Glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-900/30 via-purple-950/10 to-transparent pointer-events-none blur-3xl -z-10"></div>

      {/* Navigation Bar */}
      <div className="px-4 md:px-8 pt-6 mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all backdrop-blur-md border border-white/5 cursor-pointer text-sm font-semibold"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Hero Album Banner Header */}
      <div className="px-4 md:px-8 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-10">
        
        {/* Album Artwork with Soft Glow */}
        <div className="relative group flex-shrink-0">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-30 group-hover:opacity-50 transition duration-500 blur-xl"></div>
          <div className="relative w-52 h-52 md:w-64 md:h-64 shadow-2xl rounded-2xl overflow-hidden bg-[#1e1e1e] border border-white/10">
            <CoverImage 
                src={album.album_cover_url} 
                alt={album.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                icon="album"
            />
          </div>
        </div>

        {/* Album Metadata */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-md">
              {album.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1.5 text-white font-bold">
                    <User size={16} className="text-purple-400" /> 
                    <span>{album.artist}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-purple-400" /> 
                    <span>{album.year}</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <div className="flex items-center gap-1.5">
                    <Music size={16} className="text-purple-400" /> 
                    <span>{album.songs?.length || 0} Tracks</span>
                </div>
            </div>
        </div>
      </div>

      {/* Action Toolbar */}
      {album.songs?.length > 0 && (
        <div className="px-4 md:px-8 mb-6 flex items-center gap-4">
          <button 
            onClick={() => playSong(album.songs[0], album.songs)}
            className="flex items-center gap-2.5 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Play size={18} fill="white" /> Play Album
          </button>
        </div>
      )}

      {/* Tracklist Table Container */}
      <div className="px-4 md:px-8">
        <div className="bg-[#121212]/80 border border-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-2xl">
          {album.songs?.length > 0 ? (
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                          <th className="pb-4 pl-4 w-12">#</th>
                          <th className="pb-4">Title</th>
                          <th className="pb-4 hidden md:table-cell">Artist</th>
                          <th className="pb-4 pr-6 text-right"><Clock size={16} className="inline" /></th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {album.songs.map((song, index) => {
                          const isCurrent = currentSong?.id === song.id;
                          return (
                              <tr 
                                  key={song.id} 
                                  onClick={() => playSong(song, album.songs)} 
                                  className={`group hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 ${isCurrent ? 'bg-purple-500/10' : ''}`}
                              >
                                  <td className="py-4 pl-4 text-gray-400 text-sm font-mono">
                                      {isCurrent ? (
                                          <div className="flex items-center gap-1 h-4">
                                            <span className="w-1 bg-purple-500 animate-bounce h-full rounded-full"></span>
                                            <span className="w-1 bg-purple-500 animate-bounce delay-75 h-2/3 rounded-full"></span>
                                            <span className="w-1 bg-purple-500 animate-bounce delay-150 h-4/5 rounded-full"></span>
                                          </div>
                                      ) : (
                                          <>
                                              <span className="group-hover:hidden">{index + 1}</span>
                                              <Play size={14} className="hidden group-hover:block text-white transition-transform group-hover:scale-110" fill="white" />
                                          </>
                                      )}
                                  </td>
                                  
                                  <td className="py-4">
                                      <div className="font-bold text-sm md:text-base transition-colors group-hover:text-purple-300 truncate max-w-xs md:max-w-md">
                                        <span className={isCurrent ? 'text-purple-400' : 'text-white'}>{song.title}</span>
                                      </div>
                                  </td>
                                  
                                  <td className="py-4 text-gray-400 text-sm hidden md:table-cell truncate">
                                      {song.artist}
                                  </td>
                                  
                                  <td className="py-4 pr-6 text-right text-gray-400 text-sm font-mono">
                                      3:45
                                  </td>
                              </tr>
                          );
                      })}
                  </tbody>
              </table>
          ) : (
              <div className="text-center py-16 text-gray-500 flex flex-col items-center gap-2">
                  <Music size={32} className="opacity-40" />
                  <p>No tracks available in this album yet.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;