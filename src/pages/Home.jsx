import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import MainContent from '../components/mainContent';

export const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
     <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainContent />
      </div>
    </div>
  )
}
