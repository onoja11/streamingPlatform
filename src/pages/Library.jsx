import React, { useState } from 'react';
import { Play, Heart, Plus, Music, Disc, Clock } from 'lucide-react';
import { songs, albums } from '../data/mockData';
import { usePlayer } from '../context/PlayerContext';

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');
  const { playSong } = usePlayer();

  const playlists = [
    { id: 1, title: 'Sunday Morning', count: 12, cover: 'bg-gradient-to-br from-blue-700 to-cyan-500' },
    { id: 2, title: 'Deep Worship', count: 45, cover: 'bg-gradient-to-br from-purple-800 to-indigo-900' },
    { id: 3, title: 'Choir Rehearsal', count: 8, cover: 'bg-gradient-to-br from-orange-700 to-yellow-600' },
  ];

  return (
    <div className="md:p-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
           <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">My Library</h1>
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 transition-colors">
            <Plus size={20} />
        </button>
      </div>

      {/* Scrollable Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {['playlists', 'albums', 'songs'].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-bold text-xs md:text-sm capitalize whitespace-nowrap transition-all ${
                    activeTab === tab 
                    ? 'bg-white text-black' 
                    : 'bg-[#181818] text-gray-400 hover:text-white border border-white/5'
                }`}
            >
                {tab}
            </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* --- PLAYLISTS --- */}
        {activeTab === 'playlists' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                <div className="col-span-2 md:col-span-1 aspect-square rounded-xl bg-gradient-to-br from-purple-700 to-purple-900 p-4 md:p-6 flex flex-col justify-end relative group cursor-pointer overflow-hidden">
                    <div className="mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Liked Songs</h2>
                        <p className="text-white/70 text-xs mt-1">324 songs</p>
                    </div>
                </div>
                {playlists.map(pl => (
                    <div key={pl.id} className="bg-[#181818] p-3 md:p-4 rounded-xl cursor-pointer">
                        <div className={`aspect-square rounded-lg mb-3 ${pl.cover} flex items-center justify-center`}>
                             <Music size={30} className="text-white/50" />
                        </div>
                        <h3 className="font-bold text-white truncate text-sm">{pl.title}</h3>
                        <p className="text-xs text-gray-400">By You</p>
                    </div>
                ))}
            </div>
        )}

        {/* --- ALBUMS --- */}
        {activeTab === 'albums' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {albums.map(album => (
                    <div key={album.id} className="bg-[#181818] p-3 md:p-4 rounded-xl cursor-pointer">
                        <div className="aspect-square bg-gray-800 rounded-lg mb-3 shadow-lg flex items-center justify-center">
                            <Disc size={40} className="text-white/20" />
                        </div>
                        <h3 className="font-bold text-white truncate text-sm">{album.title}</h3>
                        <p className="text-xs text-gray-400">{album.artist}</p>
                    </div>
                ))}
            </div>
        )}

        {/* --- SONGS (Responsive List) --- */}
        {activeTab === 'songs' && (
            <div className="bg-[#181818] rounded-xl overflow-hidden">
                {songs.map((song, index) => (
                    <div 
                        key={song.id} 
                        onClick={() => playSong(song)}
                        className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0"
                    >
                        <div className="w-6 text-center text-gray-500 font-mono text-xs hidden md:block">{index + 1}</div>
                        <img src={song.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-800" />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-sm truncate">{song.title}</h4>
                            <p className="text-gray-400 text-xs truncate">{song.artist}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Heart size={16} className="text-purple-500" />
                            <span className="text-gray-400 text-xs hidden md:block">4:12</span>
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