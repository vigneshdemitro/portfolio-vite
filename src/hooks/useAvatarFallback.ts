import { useState, useEffect } from 'react';

interface UseAvatarFallbackResult {
  imgSrc: string;
  imgError: boolean;
  handleImgError: () => void;
}

/**
 * Hook to manage avatar image fallback behavior.
 * Falls back to a sketch image, then to error state if both fail to load.
 * @param initialUrl - The primary image URL to attempt loading
 * @param fallbackUrl - The fallback sketch image URL (default: '/vignesh_sketch.png')
 * @returns Object with current imgSrc, imgError state, and error handler
 */
export function useAvatarFallback(
  initialUrl: string,
  fallbackUrl: string = '/vignesh_sketch.png'
): UseAvatarFallbackResult {
  const [imgSrc, setImgSrc] = useState(initialUrl || fallbackUrl);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (initialUrl) {
      setImgSrc(initialUrl);
      setImgError(false);
    }
  }, [initialUrl]);

  const handleImgError = () => {
    if (imgSrc !== fallbackUrl) {
      setImgSrc(fallbackUrl);
    } else {
      setImgError(true);
    }
  };

  return { imgSrc, imgError, handleImgError };
}
