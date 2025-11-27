import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import BottomPlayer from '../components/BottomPlayer';
import Navbar from '../components/Navbar';
import SearchModal from '../components/SearchModal'; // Import it
import { usePlayer } from '../context/PlayerContext';

const AppLayout = () => {
  const { currentSong } = usePlayer();

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* The Search Modal lives here, independent of the grid */}
      <SearchModal />

      <Sidebar />
      
      <div className="flex-1 flex flex-col relative bg-[#121212] md:m-2 md:rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10">
        <Navbar />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
          <Outlet />
        </main>
        {currentSong && <div className="h-24"></div>}
      </div>
      
      <BottomPlayer />
    </div>
  );
};

export default AppLayout;