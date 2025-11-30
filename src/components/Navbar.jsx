// src/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { User, LogOut } from 'lucide-react';
import api from '../api/axios'; // Import your axios instance

const Navbar = () => {
  const { user, setUser } = usePlayer();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        // Optional: Call Laravel API to revoke token
        await api.post('/logout');
        
    } catch (error) {
        console.error("Logout failed", error);
    }

    // 1. Remove Token

    // 2. Reset Context
    setUser({
        name: 'Guest',
        email: '',
        isLoggedIn: false,
        isPremium: false
    });

    // 3. Redirect to Login
    navigate('/login');
  };

  return (
    <div className="sticky top-0 h-16 bg-[#000000]/90 backdrop-blur-md z-40 flex items-center justify-between px-8 border-b border-white/5">
       <div className="text-white font-bold md:hidden">GraceMusic</div>
       
       <div className="ml-auto flex items-center gap-4">
          {!user.isLoggedIn ? (
             <>
                <Link to="/login" className="text-gray-300 hover:text-white font-bold text-sm">
                    Log In
                </Link>
                <Link 
                    to="/login" // Or /register if you want a separate route
                    className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
                >
                    Sign Up
                </Link>
             </>
          ) : (
            <div className="flex items-center gap-4">
                {/* User Name */}
                <span className="text-white text-sm font-bold hidden md:block">
                    Hi, {user.name}
                </span>

                {/* User Icon */}
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white border-2 border-[#121212]">
                    <User size={16} />
                </div>

                {/* Logout Button */}
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 font-bold border border-red-500/30 px-3 py-1.5 rounded-full transition-colors"
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