import React, { useState } from 'react';
import { Music, Disc } from 'lucide-react';

// Helper to construct full image URL
const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `http://evy_max_api.test/storage/${path}`; // Use your actual API URL here
};

const CoverImage = ({ src, alt, className, icon = 'music' }) => {
  const [hasError, setHasError] = useState(false);
  const fullSrc = getImageUrl(src);

  // If no source or error occurred, show Placeholder
  if (!fullSrc || hasError) {
    return (
      <div className={`bg-[#222] flex items-center justify-center border border-white/5 ${className}`}>
        {icon === 'album' ? (
            <Disc className="text-gray-600 w-1/2 h-1/2" strokeWidth={1} />
        ) : (
            <Music className="text-gray-600 w-1/2 h-1/2" strokeWidth={1} />
        )}
      </div>
    );
  }

  return (
    <img 
        src={fullSrc} 
        alt={alt || "Cover"} 
        className={className}
        onError={() => setHasError(true)} 
    />
  );
};

export default CoverImage;