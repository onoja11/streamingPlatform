import React from 'react';
import { Play } from 'lucide-react';

const MainContent = () => {
  
  // Fake Data
  const recentItems = [
    { id: 1, title: 'Liked Songs', type: 'Playlist' },
    { id: 2, title: 'Daily Mix 1', type: 'Mix' },
    { id: 3, title: 'Discover Weekly', type: 'Playlist' },
    { id: 4, title: 'On Repeat', type: 'Playlist' },
    { id: 5, title: 'Top Hits', type: 'Playlist' },
    { id: 6, title: 'Podcast', type: 'Show' },
  ];

  const madeForYou = [
    { id: 1, title: 'Daily Mix 1', desc: 'The Weeknd, Drake, Future' },
    { id: 2, title: 'Daily Mix 2', desc: 'Pink Floyd, Led Zeppelin' },
    { id: 3, title: 'Daily Mix 3', desc: 'Lo-Fi Beats to study to' },
    { id: 4, title: 'Daily Mix 4', desc: 'Daft Punk, Justice, Kavinsky' },
  ];

  return (
    <div className="p-6 pt-2">
        
        {/* Subtle background gradient at top */}
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-purple-900/50 to-[#121212] pointer-events-none -z-10" />

        {/* Good Morning / Recents Grid */}
        <section className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Good morning</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {recentItems.map((item) => (
                    <div key={item.id} className="group flex items-center bg-[#2a2a2a]/20 hover:bg-[#2a2a2a] transition-colors rounded-md overflow-hidden cursor-pointer h-16 sm:h-20">
                        {/* Image */}
                        <div className="h-full w-16 sm:w-20 bg-gradient-to-br from-purple-800 to-gray-800 shadow-lg flex-shrink-0"></div>
                        {/* Text */}
                        <div className="px-4 font-bold text-sm sm:text-base truncate flex-1 flex justify-between items-center">
                            <span>{item.title}</span>
                            {/* Play Button - Visible on Hover */}
                            <div className="w-10 h-10 bg-green-500 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                                <Play fill="black" size={20} className="text-black ml-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Section: Made For You */}
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-2xl font-bold hover:underline cursor-pointer">Made For You</h2>
                <span className="text-xs font-bold text-gray-400 hover:underline cursor-pointer tracking-widest uppercase">Show all</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {madeForYou.map((item) => (
                    <div key={item.id} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group">
                        <div className="aspect-square bg-[#333] rounded-md mb-4 relative shadow-lg overflow-hidden">
                             {/* Placeholder Img */}
                             <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900"></div>
                             {/* Float Play Button */}
                             <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full shadow-xl flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                                <Play fill="black" size={24} className="text-black ml-1" />
                            </div>
                        </div>
                        <h3 className="font-bold mb-1 truncate">{item.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    </div>
  );
};

export default MainContent;