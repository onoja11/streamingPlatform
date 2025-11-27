import React, { useState } from 'react';
import { Play, Heart, Plus, Music, Disc, ListMusic, Clock } from 'lucide-react';
import { songs, albums } from '../data/mockData';
import { usePlayer } from '../context/PlayerContext';
import SongCard from '../components/SongCard';

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');
  const { playSong } = usePlayer();

  // Mock User Playlists
  const playlists = [
    { id: 1, title: 'Sunday Morning', count: 12, cover: 'bg-gradient-to-br from-blue-700 to-cyan-500' },
    { id: 2, title: 'Deep Worship', count: 45, cover: 'bg-gradient-to-br from-purple-800 to-indigo-900' },
    { id: 3, title: 'Choir Rehearsal', count: 8, cover: 'bg-gradient-to-br from-orange-700 to-yellow-600' },
  ];

  return (
    <div className="p-8 pb-32">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-4xl font-bold text-white mb-2">My Library</h1>
           <p className="text-gray-400 text-sm">Your personal collection of worship.</p>
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors border border-white/5">
            <Plus size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
        {['playlists', 'albums', 'songs'].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-bold text-sm capitalize transition-all ${
                    activeTab === tab 
                    ? 'bg-white text-black' 
                    : 'bg-[#181818] text-gray-400 hover:text-white hover:bg-[#222]'
                }`}
            >
                {tab}
            </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* --- PLAYLISTS TAB --- */}
        {activeTab === 'playlists' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {/* Liked Songs (Special Card) */}
                <div className="col-span-2 md:col-span-1 aspect-square rounded-xl bg-gradient-to-br from-purple-700 to-purple-900 p-6 flex flex-col justify-end relative group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                    <div className="mb-4">
                        <p className="text-white/70 text-sm font-medium mb-1">Playlist</p>
                        <h2 className="text-3xl font-bold text-white">Liked Songs</h2>
                        <p className="text-white/70 text-sm mt-1">324 songs</p>
                    </div>
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Play fill="black" className="ml-1 text-black" size={20} />
                    </div>
                </div>

                {/* User Playlists */}
                {playlists.map(pl => (
                    <div key={pl.id} className="bg-[#181818] p-4 rounded-xl hover:bg-[#222] transition-colors cursor-pointer group">
                        <div className={`aspect-square rounded-lg mb-4 shadow-lg ${pl.cover} flex items-center justify-center relative`}>
                             <Music size={40} className="text-white/50" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <Play size={30} fill="white" className="text-white" />
                             </div>
                        </div>
                        <h3 className="font-bold text-white truncate">{pl.title}</h3>
                        <p className="text-sm text-gray-400">By You</p>
                    </div>
                ))}
            </div>
        )}

        {/* --- ALBUMS TAB --- */}
        {activeTab === 'albums' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albums.map(album => (
                    <div key={album.id} className="bg-[#181818] p-4 rounded-xl hover:bg-[#222] transition-colors group cursor-pointer">
                        <div className="aspect-square bg-gray-800 rounded-lg mb-4 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Disc size={60} className="text-white/20 group-hover:rotate-12 transition-transform duration-500" />
                            </div>
                        </div>
                        <h3 className="font-bold text-white truncate">{album.title}</h3>
                        <p className="text-sm text-gray-400">{album.artist}</p>
                    </div>
                ))}
            </div>
        )}

        {/* --- SONGS TAB (List View) --- */}
        {activeTab === 'songs' && (
            <div className="bg-[#181818] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 border-b border-white/5 text-xs text-gray-400 uppercase font-bold tracking-wider">
                    <span className="w-8 text-center">#</span>
                    <span>Title</span>
                    <span className="hidden md:block">Album</span>
                    <span className="pr-4"><Clock size={16} /></span>
                </div>
                
                {songs.map((song, index) => (
                    <div 
                        key={song.id} 
                        onClick={() => playSong(song)}
                        className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-3 items-center hover:bg-white/5 cursor-pointer group transition-colors border-b border-white/5 last:border-0"
                    >
                        <div className="w-8 text-center text-gray-400 group-hover:text-white font-mono text-sm">
                            <span className="group-hover:hidden">{index + 1}</span>
                            <Play size={12} className="hidden group-hover:block mx-auto fill-white" />
                        </div>
                        <div className="flex items-center gap-3">
                            <img src={song.image} alt="" className="w-10 h-10 rounded object-cover" />
                            <div>
                                <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">{song.title}</h4>
                                <p className="text-gray-400 text-xs">{song.artist}</p>
                            </div>
                        </div>
                        <div className="hidden md:block text-gray-400 text-sm">The Awakening</div>
                        <div className="flex items-center gap-4 pr-4">
                            <Heart size={16} className="text-purple-500 fill-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-gray-400 text-sm">4:12</span>
                        </div>
                    </div>
                ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default Library;