import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import CoverImage from '../components/CoverImage'; // Import
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = usePlayer();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [songsRes, albumsRes] = await Promise.all([api.get('/songs'), api.get('/albums')]);
            setSongs(songsRes.data);
            setAlbums(albumsRes.data);
        } catch (error) { console.error(error); } 
        finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="md:p-8 pb-24">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-black rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 flex flex-col justify-end h-64 md:h-80 relative overflow-hidden border border-white/10 group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=80')] bg-cover opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"></div>
        <div className="relative z-10">
            <h5 className="text-purple-300 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">{user.isLoggedIn ? 'Welcome Back' : 'Discover Grace'}</h5>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 leading-tight">{user.isLoggedIn ? `${getGreeting()}, ${user.name}` : 'Music for the Soul'}</h1>
            <button onClick={() => user.isLoggedIn ? navigate('/library') : navigate('/login')} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2 md:px-8 md:py-3 text-sm rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]">{user.isLoggedIn ? 'Go to Library' : 'Get Started'}</button>
        </div>
      </div>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Latest Singles</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {songs.map(song => <SongCard key={song.id} song={song} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Top Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
             {albums.map(album => (
                 <div key={album.id} onClick={() => navigate(`/album/${album.id}`)} className="bg-[#181818] p-3 md:p-4 rounded-xl hover:bg-[#222] transition-colors group cursor-pointer border border-transparent hover:border-purple-500/20">
                     <div className="aspect-square rounded-lg mb-3 shadow-lg relative overflow-hidden">
                          {/* USE COVER IMAGE COMPONENT */}
                          <CoverImage 
                            src={album.cover_image} 
                            className="w-full h-full object-cover" 
                            icon="album" 
                          />
                     </div>
                     <h3 className="font-bold text-white truncate text-sm md:text-base">{album.title}</h3>
                     <p className="text-xs text-gray-400 mt-1">{album.year}</p>
                 </div>
             ))}
        </div>
      </section>
    </div>
  );
};

export default Home;