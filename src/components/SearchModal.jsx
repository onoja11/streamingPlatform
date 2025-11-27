import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Play, ArrowRight } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { songs } from '../data/mockData'; // Import your data

const SearchModal = () => {
  const { isSearchOpen, closeSearch, playSong } = usePlayer();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
    // Reset query when closed
    if (!isSearchOpen) setQuery('');
  }, [isSearchOpen]);

  // Real-time filtering
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      
      {/* Backdrop (Click to close) */}
      <div 
        onClick={closeSearch}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header / Input */}
        <div className="flex items-center gap-4 p-4 border-b border-white/5">
          <Search className="text-gray-400" size={24} />
          <input
            ref={inputRef}
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xl font-bold text-white placeholder-gray-500 focus:outline-none"
          />
          <button 
            onClick={closeSearch}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 min-h-[300px]">
          
          {query === '' ? (
            /* Empty State / Suggestions */
            <div className="text-center py-10 text-gray-500">
                <p className="mb-4 text-sm font-bold uppercase tracking-widest">Browse Categories</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {['Worship', 'Praise', 'Live Events', 'Podcasts'].map(tag => (
                        <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm hover:bg-white/10 cursor-pointer border border-transparent hover:border-purple-500/50 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          ) : results.length > 0 ? (
            /* Result List */
            <div className="space-y-2">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Top Results</h3>
               {results.map(song => (
                 <div 
                    key={song.id} 
                    onClick={() => { playSong(song); closeSearch(); }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 cursor-pointer group transition-colors"
                 >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden relative">
                             <img src={song.image} alt="" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Play size={16} fill="white" className="text-white" />
                             </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold">{song.title}</h4>
                            <p className="text-gray-400 text-xs">{song.artist}</p>
                        </div>
                    </div>
                    {!song.isFree && (
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">PAID</span>
                    )}
                 </div>
               ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-10">
                <p className="text-gray-400">No results found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;