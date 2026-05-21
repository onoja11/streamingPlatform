import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { User, LogOut } from 'lucide-react';
import api from '../api/axios';

const Navbar = () => {
  const { user, setUser } = usePlayer();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await api.post('/logout');
    } catch (error) {
        // Log the error but proceed with local logout to prevent trapping the user
        console.error("Server-side logout failed", error);
    } finally {
        // 1. Remove Token
        localStorage.removeItem('auth_token');

        // 2. Reset Context
        setUser({
            name: 'Guest',
            email: '',
            isLoggedIn: false,
            isPremium: false,
            role: 'user'
        });

        // 3. Redirect
        navigate('/login');
    }
  };

  return (
    <div className="sticky top-0 h-16 bg-[#000000]/90 backdrop-blur-md z-40 flex items-center justify-between px-8 border-b border-white/5">
       <div className="text-white font-bold md:hidden">GraceMusic</div>
       
       <div className="ml-auto flex items-center gap-4">
          {!user.isLoggedIn ? (
             <>
                <Link to="/login" className="text-gray-300 hover:text-white font-bold text-sm transition-colors">
                    Log In
                </Link>
                <Link 
                    to="/login"
                    className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
                >
                    Sign Up
                </Link>
             </>
          ) : (
            <div className="flex items-center gap-4">
                <span className="text-white text-sm font-bold hidden md:block">
                    Hi, {user.name}
                </span>

                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white border-2 border-[#121212]">
                    <User size={16} />
                </div>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 font-bold border border-red-500/30 hover:bg-red-500/10 px-3 py-1.5 rounded-full transition-all"
                >
                    <LogOut size={12} />
                    Logout
                </button>
            </div>
          )}
       </div>
    </div>
  );
};

export default Navbar;