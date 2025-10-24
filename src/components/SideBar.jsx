import React from 'react'
import { Home, Book, Clock, X } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const libraryItems = [
    { icon: Home, label: 'Item 1' },
    { icon: Book, label: 'Item 2' },
    { icon: Clock, label: 'Item 3' }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
          onClick={onClose}
        ></div>
      )}
      <aside className={` 
        fixed lg:static inset-y-0 left-0 z-20
        w-64 bg-purple-800 text-white p-6
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex  justify-between items-center mb-6 lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-bold text-xl mb-4">Your library</h2>
          <ul className="space-y-3">
            {libraryItems.map((item, index) => (
              <li key={index} className="flex items-center gap-3 p-2 hover:bg-purple-700 rounded cursor-pointer">
                <item.icon size={20} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar