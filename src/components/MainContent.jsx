import React from 'react'

const MainContent = () => {
  const recentItems = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];

  const artistImages = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ];

  return (
    <main className="flex-1 bg-purple-950 text-white p-8 overflow-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentItems.map((item) => (
            <div key={item.id} className="bg-purple-900 p-6 rounded-lg hover:bg-purple-800 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-purple-700 rounded-full mb-2"></div>
              <div className="h-4 bg-purple-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">More of Artist Name</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artistImages.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-square bg-purple-900 rounded-lg mb-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-900"></div>
                <div className="absolute inset-4 border-2 border-purple-600 opacity-50" style={{ transform: 'rotate(15deg)' }}></div>
                <div className="absolute inset-4 border-2 border-purple-500 opacity-30" style={{ transform: 'rotate(-15deg)' }}></div>
              </div>
              <h3 className="font-semibold group-hover:underline">Album Title</h3>
              <p className="text-sm text-purple-300">Artist Name</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Profile Play Screen</h2>
        <div className="bg-purple-900 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-700 rounded-full"></div>
            <div>
              <div className="h-4 bg-purple-700 rounded w-32 mb-2"></div>
              <div className="h-3 bg-purple-800 rounded w-24"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};


export default MainContent