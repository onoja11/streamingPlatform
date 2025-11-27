import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import MobileTabBar from '../components/MobileTabBar';
import BottomPlayer from '../components/BottomPlayer';
import Navbar from '../components/Navbar';
import SearchModal from '../components/SearchModal';
import { usePlayer } from '../context/PlayerContext';

const AppLayout = () => {
  const { currentSong } = usePlayer();

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      
      <SearchModal />

      {/* Left Sidebar (Desktop) */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-[#000000] md:bg-[#121212] md:m-2 md:rounded-2xl overflow-hidden shadow-2xl">
        <Navbar />
        
        {/* SCROLL AREA:
            Added 'pb-32' to ensure content isn't hidden behind 
            the Mobile Tab Bar or Bottom Player 
        */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent pb-32 md:pb-24 p-4 md:p-0">
          <Outlet />
        </main>
      </div>
      
      {/* Bottom Player (Responsive) */}
      <BottomPlayer />

      {/* Mobile Tab Bar (Mobile Only) */}
      <MobileTabBar />
    </div>
  );
};

export default AppLayout;