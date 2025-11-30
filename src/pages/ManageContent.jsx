import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, X, Save, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';

const ManageContent = () => {
  const [activeTab, setActiveTab] = useState('albums'); // 'albums' or 'songs'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Edit State
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // --- 1. Fetch Data ---
  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      // Fetches /api/albums or /api/songs based on tab
      const res = await api.get(`/${activeTab}`);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Delete Logic ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;

    try {
      await api.delete(`/${activeTab}/${id}`);
      // Remove from UI immediately
      setItems(items.filter(item => item.id !== id));
      alert("Deleted successfully.");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete.");
    }
  };

  // --- 3. Edit/Update Logic ---
  const openEditModal = (item) => {
    setEditingItem(item);
    // Pre-fill form (Clone object)
    setEditForm({ ...item, new_cover: null, new_audio: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    // Laravel Trick: Send POST but tell Laravel it's a PUT
    formData.append('_method', 'PUT'); 
    
    formData.append('title', editForm.title);
    formData.append('artist', editForm.artist);
    if (editForm.year) formData.append('year', editForm.year); // Only for albums
    
    // Only append files if user selected a new one
    if (editForm.new_cover) formData.append(activeTab === 'albums' ? 'cover_image' : 'cover_image', editForm.new_cover);
    if (editForm.new_audio && activeTab === 'songs') formData.append('audio_file', editForm.new_audio);

    try {
      await api.post(`/${activeTab}/${editingItem.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("Updated successfully!");
      setEditingItem(null);
      fetchItems(); // Refresh list
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed. Check console.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="md:p-8 pb-32 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Content</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button 
            onClick={() => { setActiveTab('albums'); setEditingItem(null); }}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'albums' ? 'bg-purple-600 text-white' : 'bg-[#181818] text-gray-400'}`}
        >
            Albums
        </button>
        <button 
            onClick={() => { setActiveTab('songs'); setEditingItem(null); }}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'songs' ? 'bg-purple-600 text-white' : 'bg-[#181818] text-gray-400'}`}
        >
            Songs
        </button>
      </div>

      {/* List */}
      <div className="bg-[#181818] rounded-xl overflow-hidden shadow-xl">
        {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-[#222] text-gray-400 text-xs uppercase border-b border-gray-700">
                        <th className="p-4">ID</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Artist</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-gray-500 font-mono text-xs">#{item.id}</td>
                            <td className="p-4 font-bold">{item.title}</td>
                            <td className="p-4 text-gray-300">{item.artist}</td>
                            <td className="p-4 flex justify-end gap-2">
                                <button 
                                    onClick={() => openEditModal(item)}
                                    className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>

      {/* --- EDIT MODAL --- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#181818] w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Edit {activeTab === 'albums' ? 'Album' : 'Song'}</h2>
                    <button onClick={() => setEditingItem(null)}><X className="text-gray-400 hover:text-white" /></button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                        <input 
                            type="text" 
                            value={editForm.title || ''}
                            onChange={e => setEditForm({...editForm, title: e.target.value})}
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Artist</label>
                        <input 
                            type="text" 
                            value={editForm.artist || ''}
                            onChange={e => setEditForm({...editForm, artist: e.target.value})}
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 mt-1"
                        />
                    </div>

                    {/* Album Only: Year */}
                    {activeTab === 'albums' && (
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Year</label>
                            <input 
                                type="number" 
                                value={editForm.year || ''}
                                onChange={e => setEditForm({...editForm, year: e.target.value})}
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 mt-1"
                            />
                        </div>
                    )}

                    {/* File Uploads (Optional Updates) */}
                    <div className="pt-2 border-t border-gray-800">
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Update Cover Image (Optional)</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => setEditForm({...editForm, new_cover: e.target.files[0]})}
                            className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500"
                        />
                    </div>

                    {activeTab === 'songs' && (
                        <div className="pt-2">
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Update Audio File (Optional)</label>
                            <input 
                                type="file" 
                                accept="audio/*"
                                onChange={e => setEditForm({...editForm, new_audio: e.target.files[0]})}
                                className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500"
                            />
                        </div>
                    )}

                    <button 
                        disabled={isSaving}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ManageContent;