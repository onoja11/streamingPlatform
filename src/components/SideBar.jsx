import React from 'react';
import { Home, Search, Library, Upload, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

const Sidebar = () => {
  const location = useLocation();
  const { openSearch } = usePlayer();

  const NavItem = ({ to, icon: Icon, label, onClick }) => {
    const active = location.pathname === to;
    
    if (onClick) {
        return (
            <div onClick={onClick} className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer">
                <Icon size={22} />
                <span className="font-semibold">{label}</span>
            </div>
        )
    }
    return (
      <Link to={to} className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${active ? 'bg-purple-900/40 text-white border-l-4 border-purple-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
        <Icon size={22} />
        <span className="font-semibold">{label}</span>
      </Link>
    )
  };

  // ADDED: "hidden md:flex"
  return (
    <aside className="w-64 bg-black hidden md:flex flex-col h-full border-r border-white/5">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          GraceMusic
        </h1>
      </div>

      <div className="flex-1 px-2 space-y-1">
        <NavItem to="/home" icon={Home} label="Home" />
        <NavItem icon={Search} label="Search" onClick={openSearch} />
        <NavItem to="/library" icon={Library} label="My Library" />
        <div className="pt-6 pb-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">For The Artist</div>
        <NavItem to="/upload" icon={Upload} label="Upload Music" />
      </div>

       <div className="p-4 bg-gradient-to-b from-[#121212] to-purple-900/20 m-2 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 mb-2 text-yellow-500">
           <Lock size={16} />
           <span className="text-xs font-bold uppercase tracking-wide">Premium Access</span>
        </div>
        <p className="text-xs text-gray-400 mb-3">Unlock all exclusive worship sessions.</p>
        <button className="w-full bg-white text-black text-xs font-bold py-2 rounded-full hover:scale-105 transition-transform">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;