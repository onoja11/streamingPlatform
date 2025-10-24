import React from 'react'
import { Play } from 'lucide-react'
import Pic from '../assets/greg-rakozy-oMpAz-DN-9I-unsplash.jpg'


const Recent = ({ key, title, artist }) => {
    return (
        <div
            key={key}
            className="group flex items-center bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
            {/* Left Image Box */}
            <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4">
                <img
                    src={Pic}
                    alt={title}
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
                <h3 className="text-white font-semibold">{title}</h3>
                <p className="text-gray-400 text-sm">{artist}</p>
            </div>
        </div>

    )
}

export default Recent