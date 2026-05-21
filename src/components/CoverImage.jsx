import React, { useState } from 'react';
import { Music, Disc } from 'lucide-react';

const getImageUrl = (path) => {
  if (!path) return null;

  // 1. If it's already an absolute URL (Cloudinary or otherwise), use it as-is
  if (path.startsWith('http')) {
    // If it's Cloudinary, we can still apply optimizations safely
    if (path.includes('res.cloudinary.com')) {
      return path.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_500/');
    }
    return path;
  }

  // 2. If it's a relative path (starts with / or just a filename), 
  // prepend your API base.
  const baseUrl = 'http://evy_max_api.test'; 
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}/storage${cleanPath}`;
};

const CoverImage = ({ src, alt, className = "", icon = 'music' }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const fullSrc = getImageUrl(src);
  const showPlaceholder = !fullSrc || hasError || !isLoaded;

  return (
    <div className={`relative bg-[#222] overflow-hidden ${className}`}>
      
      {/* Fallback / Loading Placeholder */}
      <div 
        className={`absolute inset-0 flex items-center justify-center border border-white/5 bg-[#181818] transition-opacity duration-500 z-10 ${showPlaceholder ? 'opacity-100' : 'opacity-0'}`}
      >
        {icon === 'album' ? (
          <Disc className="text-gray-600 w-1/2 h-1/2" strokeWidth={1} />
        ) : (
          <Music className="text-gray-600 w-1/2 h-1/2" strokeWidth={1} />
        )}
      </div>

      {/* Actual Image */}
      {fullSrc && !hasError && (
        <img 
          src={fullSrc} 
          alt={alt || "Cover"} 
          className={`w-full h-full object-cover transition-opacity duration-500 z-20 relative ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)} 
        />
      )}
    </div>
  );
};

export default CoverImage;