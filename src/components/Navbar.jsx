// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { User } from 'lucide-react';

const Navbar = () => {
  const { user, setUser } = usePlayer();

  return (
    <div className="sticky top-0 h-16 bg-[#000000]/90 backdrop-blur-md z-40 flex items-center justify-between px-8 border-b border-white/5">
       <div className="text-white font-bold md:hidden">GraceMusic</div>
       
       <div className="ml-auto flex items-center gap-4">
          {!user.isLoggedIn ? (
             <>
                <Link to="/login" className="text-gray-300 hover:text-white font-bold text-sm">Log In</Link>
                <button 
                    onClick={() => setUser({...user, isLoggedIn: true, isPremium: false})} 
                    className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
                >
                    Sign Up
                </button>
             </>
          ) : (
            <div className="flex items-center gap-3">
                {user.isPremium ? (
                    <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded font-bold border border-yellow-300">PREMIUM</span>
                ) : (
                    <button onClick={() => setUser({...user, isPremium: true})} className="text-xs text-yellow-500 border border-yellow-500 px-3 py-1 rounded-full hover:bg-yellow-500 hover:text-black transition">
                        Get Premium
                    </button>
                )}
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white border-2 border-black">
                    <User size={16} />
                </div>
            </div>
          )}
       </div>
    </div>
  );
};

export default Navbar;