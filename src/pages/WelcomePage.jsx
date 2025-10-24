import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/evymax-removebg-preview.png'

const WelcomePage = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:justify-between px-6 sm:px-8">
        
        {/* Text Section */}
        <div className="relative z-10 py-16 lg:w-1/2">
          <main className="mx-auto max-w-xl text-center lg:text-left">
            <h1 className="fade-in text-4xl text-purple-900 tracking-tight font-extrabold sm:text-5xl md:text-5xl xl:text-6xl">
              <span className="block pt-9">Let The Music Speak</span>
              <span className="block">With musicMax</span>
            </h1>
            <p className="fade-in mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Dive into curated sounds that touch the soul and inspire your next move.
            </p>
            <div className="fade-in mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to="/caps"
                  className="w-full flex items-center justify-center px-9 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-900 hover:bg-white hover:border hover:border-purple-900 hover:text-purple-900 transition duration-300 md:py-4 md:text-lg md:px-10"
                >
                  Stream Now
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/caps"
                  className="w-full flex items-center justify-center px-9 py-3 border border-purple-900 text-base font-medium rounded-md text-purple-900 hover:bg-purple-900 hover:text-white transition duration-300 md:py-4 md:text-lg md:px-10"
                >
                  Featured Tracks
                </Link>
              </div>
            </div>
          </main>
        </div>

        {/* Image Section */}
        <div className="relative lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 lg:pr-10">
          <img
            src={heroImg}
            alt="Artist performing"
            className="w-80  m-3 md:w-[20px] lg:w-[200px] sm:h-[10px] hidden sm:block lg:h-80 xl:w-[550px] object-contain drop-shadow-2xl "
          />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
