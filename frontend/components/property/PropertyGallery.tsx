'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api/client';
import { Image as ImageType } from '@/lib/types';

interface PropertyGalleryProps {
  images: ImageType[];
  coverImage?: ImageType;
}

export default function PropertyGallery({ images, coverImage }: PropertyGalleryProps) {
  const allImages = coverImage ? [coverImage, ...images] : images;
  const [selectedImage, setSelectedImage] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-300 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const currentImageUrl = getStrapiMedia(allImages[selectedImage]?.url);

  return (
    <section className="relative">
      {/* Main Gallery */}
      <div className="relative h-[400px] md:h-[500px] bg-gray-200 overflow-hidden">
        {currentImageUrl && (
          <Image
            src={currentImageUrl}
            alt={allImages[selectedImage]?.alternativeText || 'Property image'}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImage(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
          {selectedImage + 1} / {allImages.length}
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 overflow-x-auto">
            {allImages.slice(0, 8).map((image, index) => {
              const thumbUrl = getStrapiMedia(image.formats?.thumbnail?.url || image.url);
              return (
                <button
                  key={`thumb-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 rounded overflow-hidden flex-shrink-0 ${
                    selectedImage === index ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {thumbUrl && (
                    <Image
                      src={thumbUrl}
                      alt={image.alternativeText || `Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}