import React, { useState } from 'react';
import { Upload as UploadIcon, DollarSign, Check } from 'lucide-react';

const Upload = () => {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div className="md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Artist Dashboard</h1>
        <p className="text-gray-400 text-sm">Upload your new track to the platform.</p>
      </div>

      <div className="bg-[#181818] border border-white/5 rounded-2xl p-4 md:p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Left: Drag Drop */}
            <div className="border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center p-8 bg-black/20 hover:border-purple-500 transition-all cursor-pointer h-48 md:h-auto">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <UploadIcon className="text-purple-400" />
                </div>
                <h3 className="text-white font-bold text-sm md:text-base">Tap to upload audio</h3>
                <p className="text-[10px] md:text-xs text-gray-500 mt-1">MP3, WAV up to 50MB</p>
            </div>

            {/* Right: Form */}
            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-2">Track Title</label>
                    <input type="text" className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-purple-500 focus:outline-none" placeholder="e.g. Amazing Grace" />
                </div>
                
                {/* Monetization */}
                <div className="pt-2">
                    <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase mb-2">Monetization</label>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setIsPaid(false)}
                            className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 font-bold text-xs transition-all ${!isPaid ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-700'}`}
                        >
                            Free
                        </button>
                        <button 
                             onClick={() => setIsPaid(true)}
                             className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 font-bold text-xs transition-all ${isPaid ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-transparent text-gray-500 border-gray-700'}`}
                        >
                            <DollarSign size={14} /> Paid
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
            <Check size={18} /> Publish Release
        </button>
      </div>
    </div>
  );
};

export default Upload;