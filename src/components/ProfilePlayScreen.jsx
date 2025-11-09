import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, MoreHorizontal } from 'lucide-react';

const ProfilePlayScreen = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [audioRef]);

  return (
    <div className="bg-purple-900 p-4 md:p-6 rounded-lg flex flex-col md:flex-row items-center md:items-start gap-4 shadow-lg w-full">
      
      {/* Album Cover */}
      <div className="w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-purple-700 rounded-lg flex items-center justify-center text-white text-3xl md:text-2xl lg:text-3xl font-bold flex-shrink-0">
        {song.title[0]}
      </div>

      {/* Song Info & Controls */}
      <div className="flex-1 flex flex-col justify-center w-full">
        <h3 className="text-lg sm:text-base md:text-lg lg:text-xl font-semibold">{song.title}</h3>
        <p className="text-sm sm:text-xs md:text-sm lg:text-base text-purple-300">{song.artist}</p>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 sm:gap-1 mt-3 flex-wrap">
          <button className="p-2 rounded-full hover:bg-purple-800 transition" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-5 h-5 sm:w-4 sm:h-4" /> : <Play className="w-5 h-5 sm:w-4 sm:h-4" />}
          </button>
          <button className="p-2 rounded-full hover:bg-purple-800 transition">
            <SkipBack className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-purple-800 transition">
            <SkipForward className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-purple-800 transition">
            <Heart className="w-5 h-5 sm:w-4 sm:h-4 text-pink-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-purple-800 transition">
            <MoreHorizontal className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-purple-700 rounded-full mt-3 w-full relative">
          <div
            className="h-1 bg-pink-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      {song.audioSrc && <audio ref={audioRef} src={song.audioSrc}></audio>}
    </div>
  );
};

export default ProfilePlayScreen;
