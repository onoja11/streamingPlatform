import React from 'react'
import { Home, Book, Clock, X, Play, Search } from 'lucide-react'
import Pic from '../assets/greg-rakozy-oMpAz-DN-9I-unsplash.jpg'

const Sidebar = ({ isOpen, onClose }) => {
  const libraryItems = [
    { icon: Home, label: 'Item 1' },
    { icon: Book, label: 'Item 2' },
    { icon: Clock, label: 'Item 3' },
    { icon: Clock, label: 'Item 4' },
    { icon: Clock, label: 'Item 5' },
    { icon: Clock, label: 'Item 6' },
    { icon: Clock, label: 'Item 7' },
    { icon: Clock, label: 'Item 8' },
    { icon: Clock, label: 'Item 9' },
    { icon: Clock, label: 'Item 10' },
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-20
          w-80 h-screen bg-purple-800 text-white p-6
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header (Fixed) */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

       

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <h2 className="text-lg font-bold mb-4">Your Library</h2>
           {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your library..."
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
          />
        </div>
          <ul className="space-y-3">
            {libraryItems.map((item, index) => (
              <div
                key={index}
                className="group flex items-center bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                {/* Left Image Box */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={Pic}
                    alt={'title'}
                    className="w-full h-full object-cover"
                  />

                  {/* Play button - only visible on hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <Play size={18} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Song Info */}
                <div>
                  <h3 className="text-white font-semibold">{'title'}</h3>
                  <p className="text-gray-400 text-sm">{'artist'}</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
