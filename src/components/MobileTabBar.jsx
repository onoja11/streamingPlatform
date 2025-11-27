import React from 'react';
import { Home, Search, Library, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

const MobileTabBar = () => {
  const location = useLocation();
  const { openSearch } = usePlayer();

  const TabItem = ({ to, icon: Icon, label, onClick }) => {
    const isActive = location.pathname === to;
    
    // Wrapper to handle either Link or Button (for Search)
    const Content = () => (
      <div className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive ? 'text-white' : 'text-gray-500'}`}>
        <Icon size={24} strokeWidth={isActive ? 3 : 2} />
        <span className="text-[10px] font-medium">{label}</span>
      </div>
    );

    if (onClick) {
      return <button onClick={onClick} className="flex-1 h-full"><Content /></button>;
    }

    return (
      <Link to={to} className="flex-1 h-full flex items-center justify-center">
        <Content />
      </Link>
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#000000] border-t border-white/10 flex items-center justify-around z-50 pb-safe">
      <TabItem to="/home" icon={Home} label="Home" />
      <TabItem icon={Search} label="Search" onClick={openSearch} />
      <TabItem to="/library" icon={Library} label="Library" />
      <TabItem to="/upload" icon={User} label="Artist" />
    </div>
  );
};

export default MobileTabBar;