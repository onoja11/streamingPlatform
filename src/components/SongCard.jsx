import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Plus, Download, Check, Loader2, AlertCircle } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import api from '../api/axios';
import CoverImage from './CoverImage';

const SongCard = ({ song, songs = [] }) => {
  const { playSong, user, currentSong, isPlaying } = usePlayer();
  const isActive = isPlaying && currentSong?.id === song.id;

  const [libraryStatus, setLibraryStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [downloadStatus, setDownloadStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [downloadProgress, setDownloadProgress] = useState(null); // number 0-100 or null
  const [statusMessage, setStatusMessage] = useState('');

  const resetTimersRef = useRef([]);

  useEffect(() => {
    return () => {
      resetTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const scheduleReset = (setter, delay = 2200) => {
    const id = setTimeout(() => {
      setter('idle');
      setStatusMessage('');
    }, delay);
    resetTimersRef.current.push(id);
  };

  // Handle Add to Library with loading & confirmation state
  const handleAddToLibrary = async (e) => {
    e.stopPropagation();
    if (libraryStatus === 'loading') return;

    if (!user?.isLoggedIn) {
      setLibraryStatus('error');
      setStatusMessage('Please log in to add songs to your library.');
      scheduleReset(setLibraryStatus, 2600);
      return;
    }

    setLibraryStatus('loading');
    setStatusMessage(`Adding "${song.title}" to library...`);

    try {
      await api.post('/libraries', { song_id: song.id });
      setLibraryStatus('success');
      setStatusMessage(`Added "${song.title}" to library.`);
      scheduleReset(setLibraryStatus, 2200);
    } catch (error) {
      console.error('Failed to add to library:', error);
      setLibraryStatus('error');
      setStatusMessage('Could not add to library.');
      scheduleReset(setLibraryStatus, 2600);
    }
  };

  // Handle Download with progress tracking & loading state
  const handleDownload = async (e) => {
    e.stopPropagation();
    if (downloadStatus === 'loading') return;

    if (!user?.isLoggedIn) {
      setDownloadStatus('error');
      setStatusMessage('Please log in to download this song.');
      scheduleReset(setDownloadStatus, 2600);
      return;
    }

    setDownloadStatus('loading');
    setDownloadProgress(null);
    setStatusMessage(`Preparing download for "${song.title}"...`);

    try {
      const response = await fetch(song.music_file_url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentLength = Number(response.headers.get('content-length')) || 0;
      let blob;

      if (response.body && contentLength > 0) {
        const reader = response.body.getReader();
        const chunks = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          const pct = Math.min(100, Math.round((received / contentLength) * 100));
          setDownloadProgress(pct);
          setStatusMessage(`Downloading "${song.title}" (${pct}%)...`);
        }

        blob = new Blob(chunks, { type: response.headers.get('content-type') || 'audio/mpeg' });
      } else {
        setStatusMessage(`Downloading "${song.title}"...`);
        blob = await response.blob();
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${song.title} - ${song.artist}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setDownloadProgress(100);
      setDownloadStatus('success');
      setStatusMessage(`Downloaded "${song.title}".`);
      scheduleReset(() => {
        setDownloadStatus('idle');
        setDownloadProgress(null);
      }, 2400);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      setDownloadProgress(null);
      setStatusMessage('Direct download blocked; opening track in new tab.');
      window.open(song.music_file_url, '_blank', 'noopener,noreferrer');
      scheduleReset(setDownloadStatus, 2600);
    }
  };

  const renderLibraryIcon = () => {
    switch (libraryStatus) {
      case 'loading':
        return <Loader2 size={18} className="animate-spin text-purple-400" />;
      case 'success':
        return <Check size={18} className="text-emerald-400" />;
      case 'error':
        return <AlertCircle size={18} className="text-rose-400" />;
      default:
        return <Plus size={18} />;
    }
  };

  const renderDownloadContent = () => {
    switch (downloadStatus) {
      case 'loading':
        return (
          <span className="inline-flex items-center gap-1 text-purple-300">
            <Loader2 size={16} className="animate-spin text-purple-400 shrink-0" />
            {downloadProgress !== null && (
              <span className="text-[11px] font-semibold tabular-nums">
                {downloadProgress}%
              </span>
            )}
          </span>
        );
      case 'success':
        return <Check size={18} className="text-emerald-400" />;
      case 'error':
        return <AlertCircle size={18} className="text-rose-400" />;
      default:
        return <Download size={18} />;
    }
  };

  const libraryTitle =
    libraryStatus === 'loading'
      ? 'Adding to Library...'
      : libraryStatus === 'success'
      ? 'Added to Library'
      : libraryStatus === 'error'
      ? statusMessage || 'Could not add to Library'
      : 'Add to Library';

  const downloadTitle =
    downloadStatus === 'loading'
      ? downloadProgress !== null
        ? `Downloading (${downloadProgress}%)...`
        : 'Downloading...'
      : downloadStatus === 'success'
      ? 'Downloaded'
      : downloadStatus === 'error'
      ? statusMessage || 'Download issue'
      : 'Download Song';

  return (
    <div
      onClick={() => playSong(song, songs)}
      className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-all duration-300 group cursor-pointer relative"
    >
      {/* Screen-reader & live feedback announcement */}
      <span className="sr-only" aria-live="polite">
        {statusMessage}
      </span>

      {/* Cover Art Section */}
      <div className="aspect-square rounded-lg mb-4 overflow-hidden relative shadow-lg">
        <CoverImage
          src={song.music_cover_url}
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          icon="music"
        />

        {/* Play/Pause Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
            isActive
              ? 'opacity-100'
              : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
              isActive ? 'bg-purple-500' : 'bg-purple-600'
            }`}
          >
            {isActive ? (
              <Pause size={20} fill="white" className="text-white" />
            ) : (
              <Play size={20} fill="white" className="ml-1 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Info and Actions Section */}
      <div className="flex justify-between items-start gap-2">
        <div className="overflow-hidden flex-1">
          <h3 className={`font-bold truncate ${isActive ? 'text-purple-400' : 'text-white'}`}>
            {song.title}
          </h3>
          <p className="text-sm text-gray-400 truncate">{song.artist}</p>

          {/* Compact inline feedback line when active */}
          {statusMessage && (
            <p
              className={`text-[11px] mt-1 truncate ${
                libraryStatus === 'error' || downloadStatus === 'error'
                  ? 'text-rose-400'
                  : libraryStatus === 'success' || downloadStatus === 'success'
                  ? 'text-emerald-400'
                  : 'text-purple-300'
              }`}
            >
              {statusMessage}
            </p>
          )}
        </div>

        {/* Buttons Group */}
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleAddToLibrary}
            disabled={libraryStatus === 'loading'}
            aria-busy={libraryStatus === 'loading'}
            className="text-gray-400 hover:text-white disabled:opacity-80 disabled:cursor-wait transition-colors p-0.5 rounded"
            title={libraryTitle}
            aria-label={libraryTitle}
          >
            {renderLibraryIcon()}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadStatus === 'loading'}
            aria-busy={downloadStatus === 'loading'}
            className="text-gray-400 hover:text-purple-400 disabled:opacity-90 disabled:cursor-wait transition-colors p-0.5 rounded"
            title={downloadTitle}
            aria-label={downloadTitle}
          >
            {renderDownloadContent()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;