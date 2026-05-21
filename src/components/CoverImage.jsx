import React, { useState } from 'react';
import { Music, Disc } from 'lucide-react';

const getImageUrl = (path) => {
  if (!path) return null;

  // 1. If it's a Cloudinary URL, let's inject optimizations!
  if (path.includes('res.cloudinary.com')) {
    // Inject f_auto (auto-format like WebP) and q_auto (auto-quality compression)
    // This turns .../upload/v123/... into .../upload/f_auto,q_auto/v123/...
    // It reduces image size by ~70% without losing visible quality.
    return path.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_500/');
  }

  // 2. If it's any other absolute HTTP link, just return it
  if (path.startsWith('http')) {
    return path;
  }

  // 3. Fallback for local development (if Cloudinary isn't used locally)
  const baseUrl = 'http://evy_max_api.test'; 
  const cleanPath = path.replace(/^\/+/, ''); 
  
  if (cleanPath.startsWith('storage/')) {
    return `${cleanPath}`;
  }

  return `${cleanPath}`; 
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