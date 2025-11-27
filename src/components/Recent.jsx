import React from 'react'
import { Play } from 'lucide-react'
// import Pic from '../assets/greg-rakozy-oMpAz-DN-9I-unsplash.jpg'

const Recent = ({ title, artist }) => {
    return (
        <div className="group flex items-center bg-white/5 border border-white/5 p-2 pr-4 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden relative">
            
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Left Image Box */}
            <div className="relative w-14 h-14 rounded bg-gray-800 flex-shrink-0 mr-4 overflow-hidden">
                {/* Fallback gradient if no image */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900"></div>
                
                {/* Play button - only visible on hover */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <Play size={16} className="text-white fill-white" />
                </div>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0 z-10">
                <h3 className="text-white font-semibold text-sm truncate">{title}</h3>
                <p className="text-gray-400 text-xs truncate">{artist}</p>
            </div>
            
            {/* Active Graphic (Optional) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <div className="flex space-x-[2px] items-end h-4">
                    <div className="w-[3px] bg-green-400 h-2 animate-pulse"></div>
                    <div className="w-[3px] bg-green-400 h-4 animate-pulse delay-75"></div>
                    <div className="w-[3px] bg-green-400 h-3 animate-pulse delay-150"></div>
                </div>
            </div>
        </div>
    )
}

export default Recent