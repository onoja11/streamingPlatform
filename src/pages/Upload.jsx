import React, { useState, useEffect } from 'react';
import { Upload as UploadIcon, Disc, Music, Check, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';

const Upload = () => {
  const [activeTab, setActiveTab] = useState('album'); 
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [albums, setAlbums] = useState([]);

  // --- STATES ---
  const [albumData, setAlbumData] = useState({ 
    title: '', artist: '', year: '', cover: null 
  });

  const [songData, setSongData] = useState({ 
    title: '', 
    artist: '', // Added Artist to Song
    album_id: '', // Optional now
    audio: null,
    cover: null // Added Cover to Song
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await api.get('/albums');
      setAlbums(res.data);
    } catch (err) {
      console.error("Failed to fetch albums", err);
    }
  };

  // ... (handleAlbumSubmit stays the same) ...
  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('title', albumData.title);
    formData.append('artist', albumData.artist);
    formData.append('year', albumData.year);
    if (albumData.cover) formData.append('cover_image', albumData.cover);

    try {
      await api.post('/albums', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Album created successfully!' });
      setAlbumData({ title: '', artist: '', year: '', cover: null });
      fetchAlbums(); 
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to create album.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('title', songData.title);
    formData.append('artist', songData.artist);
    
    // Only append album_id if user actually selected one
    if (songData.album_id) {
        formData.append('album_id', songData.album_id);
    }

    if (songData.audio) formData.append('audio_file', songData.audio);
    if (songData.cover) formData.append('cover_image', songData.cover);

    try {
      await api.post('/songs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Song uploaded successfully!' });
      setSongData({ title: '', artist: '', album_id: '', audio: null, cover: null });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to upload song.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:p-8 max-w-4xl mx-auto min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">Manage your library content.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button 
            onClick={() => { setActiveTab('album'); setMessage(null); }}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'album' ? 'bg-purple-600 text-white' : 'bg-[#181818] text-gray-400 hover:text-white'}`}
        >
            <Disc size={20} /> Create Album
        </button>
        <button 
            onClick={() => { setActiveTab('song'); setMessage(null); }}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'song' ? 'bg-purple-600 text-white' : 'bg-[#181818] text-gray-400 hover:text-white'}`}
        >
            <Music size={20} /> Upload Song
        </button>
      </div>

      {/* Feedback Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            {message.text}
        </div>
      )}

      <div className="bg-[#181818] border border-white/5 rounded-2xl p-4 md:p-8 shadow-2xl animate-in fade-in">
        
        {/* --- ALBUM FORM (Unchanged) --- */}
        {activeTab === 'album' && (
            <form onSubmit={handleAlbumSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">Album Cover</label>
                        <div className="border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center h-64 bg-black/20 hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden">
                            <input type="file" accept="image/*" onChange={(e) => setAlbumData({...albumData, cover: e.target.files[0]})} className="absolute inset-0 opacity-0 cursor-pointer" />
                            {albumData.cover ? <img src={URL.createObjectURL(albumData.cover)} alt="Preview" className="w-full h-full object-cover" /> : <UploadIcon className="text-purple-400" />}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Album Title</label>
                            <input required type="text" value={albumData.title || ''} onChange={e => setAlbumData({...albumData, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Artist</label>
                            <input required type="text" value={albumData.artist || ''} onChange={e => setAlbumData({...albumData, artist: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Release Year</label>
                            <input required type="number" value={albumData.year || ''} onChange={e => setAlbumData({...albumData, year: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" />
                        </div>
                    </div>
                </div>
                <button disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50">{isLoading ? 'Creating...' : 'Create Album'}</button>
            </form>
        )}

        {/* --- SONG FORM (Updated) --- */}
        {activeTab === 'song' && (
            <form onSubmit={handleSongSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Col: Uploads */}
                    <div className="space-y-4">
                        {/* Audio */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Audio File</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center h-32 bg-black/20 hover:border-purple-500 transition-all cursor-pointer relative">
                                <input required type="file" accept="audio/*" onChange={(e) => setSongData({...songData, audio: e.target.files[0]})} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <Music className="text-purple-400 mb-2" />
                                <span className="text-gray-400 text-xs text-center px-2">{songData.audio ? songData.audio.name : 'Click to upload MP3'}</span>
                            </div>
                        </div>

                        {/* Song Cover (New) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Song Cover (Optional)</label>
                            <div className="border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center h-32 bg-black/20 hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden">
                                <input type="file" accept="image/*" onChange={(e) => setSongData({...songData, cover: e.target.files[0]})} className="absolute inset-0 opacity-0 cursor-pointer" />
                                {songData.cover ? <img src={URL.createObjectURL(songData.cover)} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs">Upload Cover</span>}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Details */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Song Title</label>
                            <input required type="text" value={songData.title || ''} onChange={e => setSongData({...songData, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Artist</label>
                            <input required type="text" value={songData.artist || ''} onChange={e => setSongData({...songData, artist: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Album (Optional)</label>
                            <select 
                                value={songData.album_id || ''} 
                                onChange={e => setSongData({...songData, album_id: e.target.value})} 
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                            >
                                <option value="">Single (No Album)</option>
                                {albums.map(album => (
                                    <option key={album.id} value={album.id}>{album.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50">{isLoading ? 'Uploading...' : 'Upload Song'}</button>
            </form>
        )}
      </div>
    </div>
  );
};

export default Upload;