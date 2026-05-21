import React from 'react';
import { Home, Search, Library, Upload, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

const MobileTabBar = () => {
  const location = useLocation();
  const { openSearch, user } = usePlayer();

  const TabItem = ({ to, icon: Icon, label, onClick }) => {
    const isActive = location.pathname === to;
    
    const Content = () => (
      <div className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}>
        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] font-semibold">{label}</span>
      </div>
    );

    if (onClick) {
      return <button onClick={onClick} className="flex-1 h-full">{<Content />}</button>;
    }

    return (
      <Link to={to} className="flex-1 h-full flex items-center justify-center">
        <Content />
      </Link>
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[68px] bg-[#000000] border-t border-white/10 flex items-center justify-around z-50 pb-[env(safe-area-inset-bottom)]">
      <TabItem to="/home" icon={Home} label="Home" />
      <TabItem icon={Search} label="Search" onClick={openSearch} />
      <TabItem to="/library" icon={Library} label="Library" />

      {/* --- ADMIN LOGIC --- */}
      {user.role === 'admin' ? (
        <>
            <TabItem to="/upload" icon={Upload} label="Upload" />
            <TabItem to="/manage" icon={Settings} label="Manage" />
        </>
      ) : (
        <TabItem to="/profile" icon={User} label="Profile" />
      )}
    </div>
  );
};

export default MobileTabBar;