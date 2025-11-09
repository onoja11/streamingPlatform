import React from 'react';
import { Play } from 'lucide-react';
import Recent from './Recent';
import ProfilePlayScreen from './ProfilePlayScreen';

const MainContent = () => {
  const recentItems = [
    { id: 1, title: 'Song One', artist: 'Artist A' },
    { id: 2, title: 'Song Two', artist: 'Artist B' },
    { id: 3, title: 'Song Three', artist: 'Artist C' }
  ];

  const artistImages = [
    { id: 1, title: 'Album One', artist: 'Artist A' },
    { id: 2, title: 'Album Two', artist: 'Artist B' },
    { id: 3, title: 'Album Three', artist: 'Artist C' },
    { id: 4, title: 'Album Four', artist: 'Artist D' }
  ];

  const currentSong = {
    title: 'Profile Song',
    artist: 'Artist Name',
    audioSrc: '' // Optional: path to audio file
  };

  return (
    <main className="flex-1 bg-purple-950 text-white p-8 overflow-auto">
      {/* Recents */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentItems.map((item) => (
            <Recent key={item.id} title={item.title} artist={item.artist} icon={<Play className="text-purple-300" />} />
          ))}
        </div>
      </section>

      {/* More of Artist */}
      <section>
        <h2 className="text-2xl font-bold mb-6">More of Artist Name</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artistImages.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-square bg-purple-900 rounded-lg mb-3 relative overflow-hidden group-hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-900"></div>
                <div className="absolute inset-4 border-2 border-purple-600 opacity-50 rotate-15"></div>
                <div className="absolute inset-4 border-2 border-purple-500 opacity-30 -rotate-15"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="font-semibold group-hover:underline">{item.title}</h3>
              <p className="text-sm text-purple-300">{item.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Play Screen */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Now Playing</h2>
        <ProfilePlayScreen song={currentSong} />
      </section>
    </main>
  );
};

export default MainContent;
