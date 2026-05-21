import React from 'react';
import { User, Mail, CreditCard, Shield, LogOut } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Profile = () => {
  const { user, setUser } = usePlayer();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser({ name: 'Guest', email: '', isLoggedIn: false, isPremium: false, role: 'user' });
      navigate('/login');
    }
  };

  return (
    <div className="md:p-8 pb-24 max-w-2xl mx-auto min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {/* User Card */}
      <div className="bg-[#181818] p-8 rounded-2xl border border-white/5 mb-6 shadow-2xl">
        <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
            </div>
        </div>

        <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                <Mail className="text-purple-400" />
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                    <p>{user.email}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                <Shield className="text-purple-400" />
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Account Type</p>
                    <p className="capitalize">{user.isPremium ? 'Premium Member' : 'Free Tier'}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Actions */}
      <button 
        onClick={handleLogout}
        className="w-full py-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
      >
        <LogOut size={18} /> Log Out
      </button>
    </div>
  );
};

export default Profile;