import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { songs } from '../data/mockData';

const SearchModal = () => {
  const { isSearchOpen, closeSearch, playSong } = usePlayer();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) setTimeout(() => inputRef.current.focus(), 100);
    if (!isSearchOpen) setQuery('');
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = songs.filter(song => 
      song.title.toLowerCase().includes(lowerQuery) || 
      song.artist.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-0 md:pt-20 px-0 md:px-4">
      
      {/* Backdrop */}
      <div onClick={closeSearch} className="absolute inset-0 bg-black/90 md:bg-black/80 backdrop-blur-sm"></div>

      {/* Modal Content - Full screen mobile, rounded box desktop */}
      <div className="relative w-full h-full md:h-auto md:max-w-2xl bg-[#121212] border-0 md:border md:border-white/10 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-black md:bg-transparent mt-safe md:mt-0">
          <Search className="text-gray-400" size={24} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg font-bold text-white placeholder-gray-500 focus:outline-none"
          />
          <button onClick={closeSearch} className="text-white p-2"><X size={24} /></button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 md:max-h-[60vh]">
          {query === '' ? (
            <div className="text-center py-10 text-gray-500">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest">Browse</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {['Worship', 'Praise', 'Live', 'Podcast'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">{tag}</span>
                    ))}
                </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
               {results.map(song => (
                 <div key={song.id} onClick={() => { playSong(song); closeSearch(); }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 cursor-pointer">
                    <img src={song.image} alt="" className="w-12 h-12 rounded bg-gray-800" />
                    <div>
                        <h4 className="text-white font-bold">{song.title}</h4>
                        <p className="text-gray-400 text-xs">{song.artist}</p>
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;