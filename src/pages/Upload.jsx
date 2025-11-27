import React, { useState } from 'react';
import { Upload as UploadIcon, DollarSign, Check } from 'lucide-react';

const Upload = () => {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="p-8 pb-32 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Artist Dashboard</h1>
      <p className="text-gray-400 mb-8">Upload your new track to the platform.</p>

      <div className="bg-[#181818] border border-white/5 rounded-2xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Drag Drop Area */}
            <div className="border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center p-10 bg-black/20 hover:border-purple-500 hover:bg-purple-900/10 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadIcon className="text-purple-400" />
                </div>
                <h3 className="text-white font-bold mb-1">Drag and drop your audio</h3>
                <p className="text-xs text-gray-500">MP3, WAV up to 50MB</p>
            </div>

            {/* Right: Metadata Form */}
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Track Title</label>
                    <input type="text" className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="e.g. Amazing Grace" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Album Name</label>
                    <input type="text" className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" placeholder="e.g. The Awakening" />
                </div>
                
                {/* Monetization Toggle */}
                <div className="pt-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Monetization</label>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setIsPaid(false)}
                            className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 font-bold transition-all ${!isPaid ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-700'}`}
                        >
                            Free Track
                        </button>
                        <button 
                             onClick={() => setIsPaid(true)}
                             className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 font-bold transition-all ${isPaid ? 'bg-yellow-500 text-black border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-transparent text-gray-500 border-gray-700'}`}
                        >
                            <DollarSign size={16} /> Paid Track
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-end pt-6 border-t border-white/5">
             <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-purple-900/40 flex items-center gap-2">
                <Check size={18} /> Publish Release
             </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;