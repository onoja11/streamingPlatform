import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Disc, Calendar } from 'lucide-react'; // Added icons for info
import { usePlayer } from '../context/PlayerContext';
import api from '../api/axios';

const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/150';
    if (path.startsWith('http')) return path;
    return `http://evy_max_api.test/storage/${path}`;
};

const SearchModal = () => {
  const { isSearchOpen, closeSearch, playSong } = usePlayer();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  // Focus Input when modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) setTimeout(() => inputRef.current.focus(), 100);
    if (!isSearchOpen) {
        setQuery('');
        setResults([]);
    }
  }, [isSearchOpen]);

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        setIsSearching(true);
        try {
            // Call the new Laravel endpoint with ?query=...
            const res = await api.get(`/songs?query=${query}`);
            setResults(res.data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setIsSearching(false);
        }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-0 md:pt-20 px-0 md:px-4">
      <div onClick={closeSearch} className="absolute inset-0 bg-black/90 md:bg-black/80 backdrop-blur-sm"></div>

      <div className="relative w-full h-full md:h-auto md:max-w-2xl bg-[#121212] border-0 md:border md:border-white/10 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header */}
        <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-black md:bg-transparent mt-safe md:mt-0">
          <Search className="text-gray-400" size={24} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search songs, artists, albums or year..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg font-bold text-white placeholder-gray-500 focus:outline-none"
          />
          <button onClick={closeSearch} className="text-white p-2"><X size={24} /></button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 md:max-h-[60vh]">
          {isSearching ? (
             <div className="text-center py-10 text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
               {results.map(song => (
                 <div key={song.id} onClick={() => { playSong(song); closeSearch(); }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 cursor-pointer group">
                    <img src={getImageUrl(song.music_cover_url)} alt="" className="w-12 h-12 rounded bg-gray-800 object-cover" />
                    <div className="flex-1">
                        <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors">{song.title}</h4>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <span>{song.artist}</span>
                            {/* Display Album Info if it exists */}
                            {song.album && (
                                <>
                                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                    <Disc size={10} /> {song.album.title}
                                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                    <Calendar size={10} /> {song.album.year}
                                </>
                            )}
                        </div>
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
                {query ? 'No results found.' : 'Start typing to search...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;