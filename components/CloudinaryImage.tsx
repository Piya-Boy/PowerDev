"use client";
import { CldImage } from 'next-cloudinary';

interface CloudinaryImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export default function CloudinaryImage({ 
  src, 
  width = 500, 
  height = 500,
  alt = "Cloudinary image"
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      width={width}
      height={height}
      alt={alt}
      crop={{
        type: 'auto',
        source: true
      }}
    />
  );
} 