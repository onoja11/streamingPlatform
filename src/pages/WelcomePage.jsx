import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col">
      {/* Nav */}
      <div className="px-8 py-6 flex justify-between items-center bg-black">
         <div className="text-2xl font-bold flex items-center gap-1">
            <span className="w-8 h-8 rounded-full bg-white block"></span>
            PurpleWave
         </div>
         <div className="flex gap-6 font-bold text-base">
            <Link to="/register" className="text-gray-300 hover:text-white">Sign up</Link>
            <Link to="/login" className="text-gray-300 hover:text-white">Log in</Link>
         </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
         <div className="absolute inset-0 bg-[#000000]/60"></div> {/* Overlay */}
         
         <div className="relative z-10 max-w-3xl">
             <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white">
                 Listening is <br/> everything
             </h1>
             <p className="text-green-400 font-bold text-lg mb-8">
                 Millions of songs and podcasts. No credit card needed.
             </p>
             <Link to="/home" className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold text-lg px-8 py-4 rounded-full transition-transform hover:scale-105">
                 GET PURPLEWAVE FREE
             </Link>
         </div>
      </div>
      
      <footer className="bg-black p-8 text-xs text-gray-500 text-center">
          &copy; 2024 PurpleWave AB
      </footer>
    </div>
  )
}

export default WelcomePage