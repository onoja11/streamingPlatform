import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, X, Save, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import api from '../api/axios';

const ManageContent = () => {
  const [activeTab, setActiveTab] = useState('albums');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // Replaces alert()
  
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/${activeTab}`);
      setItems(res.data);
    } catch (err) {
      showNotification('error', 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;

    try {
      await api.delete(`/${activeTab}/${id}`);
      setItems(items.filter(item => item.id !== id));
      showNotification('success', 'Deleted successfully');
    } catch (err) {
      showNotification('error', 'Failed to delete item');
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditForm({ ...item, new_cover: null, new_audio: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append('_method', 'PUT'); 
    formData.append('title', editForm.title);
    formData.append('artist', editForm.artist);
    if (editForm.year) formData.append('year', editForm.year); 
    
    if (editForm.new_cover) formData.append('cover_image', editForm.new_cover);
    if (editForm.new_audio && activeTab === 'songs') formData.append('audio_file', editForm.new_audio);

    try {
      await api.post(`/${activeTab}/${editingItem.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showNotification('success', 'Updated successfully');
      setEditingItem(null);
      fetchItems(); 
    } catch (err) {
      showNotification('error', 'Failed to update. Please check your network.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="md:p-8 pb-32 min-h-screen text-white relative">
      <h1 className="text-3xl font-bold mb-6">Manage Content</h1>

      {notification && (
        <div className={`absolute top-8 right-8 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button 
            onClick={() => { setActiveTab('albums'); setEditingItem(null); }}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'albums' ? 'bg-purple-600 text-white' : 'bg-[#181818] text-gray-400 hover:text-white'}`}
        >
            Albums
        </button>
        <button 
            onClick={() => { setActiveTab('songs'); setEditingItem(null); }}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'songs' ? 'bg-purple-600 text-white' : 'bg-[#181818] text-gray-400 hover:text-white'}`}
        >
            Songs
        </button>
      </div>

      <div className="bg-[#181818] rounded-xl overflow-hidden shadow-xl border border-white/5">
        {loading ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                <Loader2 className="animate-spin mb-4 text-purple-500" size={32} />
                Loading {activeTab}...
            </div>
        ) : items.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No {activeTab} found.</div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#222] text-gray-400 text-xs uppercase border-b border-gray-700">
                            <th className="p-4 w-16">ID</th>
                            <th className="p-4">Title</th>
                            <th className="p-4 hidden md:table-cell">Artist</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                                <td className="p-4 text-gray-500 font-mono text-xs">#{item.id}</td>
                                <td className="p-4 font-bold truncate max-w-[200px]">{item.title}</td>
                                <td className="p-4 text-gray-300 hidden md:table-cell truncate max-w-[200px]">{item.artist}</td>
                                <td className="p-4 flex justify-end gap-2">
                                    <button 
                                        onClick={() => openEditModal(item)}
                                        className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#181818] w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-white/10 scale-in-center">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Edit {activeTab === 'albums' ? 'Album' : 'Song'}</h2>
                    <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="text-gray-400 hover:text-white" /></button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                        <input required type="text" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 mt-1 transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Artist</label>
                        <input required type="text" value={editForm.artist || ''} onChange={e => setEditForm({...editForm, artist: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 mt-1 transition-colors" />
                    </div>

                    {activeTab === 'albums' && (
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Year</label>
                            <input required type="number" value={editForm.year || ''} onChange={e => setEditForm({...editForm, year: e.target.value})} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 mt-1 transition-colors" />
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-800">
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Update Cover Image <span className="text-gray-600 font-normal">(Optional)</span></label>
                        <input type="file" accept="image/*" onChange={e => setEditForm({...editForm, new_cover: e.target.files[0]})} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
                    </div>

                    {activeTab === 'songs' && (
                        <div className="pt-2">
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Update Audio File <span className="text-gray-600 font-normal">(Optional)</span></label>
                            <input type="file" accept="audio/*" onChange={e => setEditForm({...editForm, new_audio: e.target.files[0]})} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer" />
                        </div>
                    )}

                    <div className="pt-2">
                        <button disabled={isSaving} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-lg shadow-purple-900/30">
                            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ManageContent;