import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { Disc, Music } from 'lucide-react';

// Helper to determine the correct URL
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `http://evy_max_api.test/storage/${path}`;
};

const AlbumCard = ({ album, navigate }) => {
  const [imgError, setImgError] = useState(false);
  const src = getImageUrl(album.album_cover_url);

  return (
    <div 
      onClick={() => navigate(`/album/${album.id}`)} 
      className="bg-[#181818] p-3 md:p-4 rounded-xl hover:bg-[#282828] transition-all duration-300 group cursor-pointer border border-transparent hover:border-white/10"
    >
      <div className="aspect-square rounded-lg mb-4 shadow-lg relative overflow-hidden bg-[#222] flex items-center justify-center">
        {!imgError && src ? (
            <img 
                src={src} 
                alt={album.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImgError(true)}
            />
        ) : (
            <Disc className="text-gray-600 w-1/2 h-1/2" strokeWidth={1} />
        )}
      </div>
      <h3 className="font-bold text-white truncate text-sm md:text-base group-hover:text-purple-400 transition-colors">
        {album.title}
      </h3>
      <p className="text-xs text-gray-400 mt-1">{album.year}</p>
    </div>
  );
};

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = usePlayer();

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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=80')] bg-cover opacity-40 mix-blend-overlay"></div>
        <div className="relative z-10">
            <h5 className="text-purple-300 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">{user.isLoggedIn ? 'Welcome Back' : 'Discover Grace'}</h5>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{user.isLoggedIn ? `Hello, ${user.name}` : 'Music for the Soul'}</h1>
            <button onClick={() => user.isLoggedIn ? navigate('/library') : navigate('/login')} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 text-sm rounded-full transition-all">{user.isLoggedIn ? 'Go to Library' : 'Get Started'}</button>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Latest Singles</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {songs.map(song => <SongCard key={song.id} song={song} />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Top Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
             {albums.map(album => (
                 <AlbumCard key={album.id} album={album} navigate={navigate} />
             ))}
        </div>
      </section>
    </div>
  );
};

export default Home;