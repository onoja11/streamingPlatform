import React from 'react';
import SongCard from '../components/SongCard';
import { songs, albums } from '../data/mockData';

const Home = () => {
  return (
    <div className="md:p-8">
      {/* Header Banner - Responsive Height & Text */}
      <div className="bg-gradient-to-r from-purple-900 to-black rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 flex flex-col justify-end h-64 md:h-80 relative overflow-hidden border border-white/10 group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507838153414-b4b713384ebd?w=1000&q=80')] bg-cover opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"></div>
        <div className="relative z-10">
            <h5 className="text-purple-300 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2">New Release</h5>
            <h1 className="text-3xl md:text-6xl font-black text-white mb-2 md:mb-4 leading-tight">Grace Abounds</h1>
            <p className="text-gray-300 max-w-lg mb-4 md:mb-6 text-xs md:text-sm line-clamp-2 md:line-clamp-none">Experience the new uplifting album by Minister Sarah. A journey of faith, hope, and worship available now.</p>
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2 md:px-8 md:py-3 text-sm rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                Listen Now
            </button>
        </div>
      </div>

      {/* Songs Grid */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Latest Singles</h2>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">View All</span>
        </div>
        
        {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {songs.map(song => (
                <SongCard key={song.id} song={song} />
            ))}
        </div>
      </section>

      {/* Albums Grid */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Top Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
             {albums.map(album => (
                 <div key={album.id} className="bg-[#181818] p-3 md:p-4 rounded-xl hover:bg-[#222] transition-colors group cursor-pointer border border-transparent hover:border-purple-500/20">
                     <div className="aspect-square bg-gray-800 rounded-lg mb-3 shadow-lg relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-black opacity-80"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl md:text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors">{album.title[0]}</span>
                         </div>
                     </div>
                     <h3 className="font-bold text-white truncate text-sm md:text-base">{album.title}</h3>
                     <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-400">{album.year}</p>
                        {album.isPremium && (
                            <span className="text-[8px] md:text-[10px] text-black bg-yellow-500 px-1.5 py-0.5 rounded font-bold">PREMIUM</span>
                        )}
                     </div>
                 </div>
             ))}
        </div>
      </section>
    </div>
  );
};

export default Home;