import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import CoverImage from './CoverImage';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const BottomPlayer = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayer();
  const audioRef = useRef(new Audio());
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong?.music_file_url) {
      audio.src = currentSong.music_file_url;
      audio.volume = volume;
      audio.load();
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!currentSong) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (playNext) playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, playNext]);

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const audio = audioRef.current;

    if (audio.duration) {
      audio.currentTime = clickPosition * audio.duration;
      setProgress(clickPosition * 100);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = prevVolume;
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed z-50 bottom-[68px] md:bottom-0 left-0 right-0 bg-[#0a0a0a]/95 border-t border-purple-900/30 backdrop-blur-xl px-4 py-3 md:py-0 md:h-24 flex flex-col md:flex-row items-center justify-between shadow-2xl">
      <div onClick={handleSeek} className="absolute top-0 left-0 w-full h-1.5 bg-gray-800 cursor-pointer group hover:h-2.5 transition-all">
        <div className="h-full bg-purple-600 relative group-hover:bg-purple-500 transition-all" style={{ width: `${progress}%` }}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md transition-opacity"></div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-[30%] mb-2 md:mb-0">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-[#1e1e1e]">
          <CoverImage src={currentSong.music_cover_url} className="w-full h-full object-cover" icon="music" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-white text-sm font-bold truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5 w-full md:w-[40%]">
        <div className="flex items-center gap-6">
          <button onClick={playPrevious} className="text-gray-400 hover:text-white transition-colors cursor-pointer active:scale-95" title="Previous Track">
            <SkipBack size={20} />
          </button>
          
          <button onClick={togglePlay} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer">
            {isPlaying ? <Pause size={18} fill="black" className="text-black" /> : <Play size={18} fill="black" className="ml-0.5 text-black" />}
          </button>

          <button onClick={playNext} className="text-gray-400 hover:text-white transition-colors cursor-pointer active:scale-95" title="Next Track">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] text-gray-400 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-end w-[30%] gap-3 text-gray-400">
        <button onClick={toggleMute} className="hover:text-white transition-colors cursor-pointer">
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input 
          type="range" min="0" max="1" step="0.01" value={volume}
          onChange={(e) => {
            const vol = parseFloat(e.target.value);
            setVolume(vol);
            setIsMuted(vol === 0);
            audioRef.current.volume = vol;
          }}
          className="w-24 accent-purple-500 cursor-pointer h-1 bg-gray-700 rounded-lg"
        />
      </div>
    </div>
  );
};

export default BottomPlayer;