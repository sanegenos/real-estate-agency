'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api/client';
import { Image as ImageType } from '@/lib/types';

interface PropertyPhotosProps {
  images: ImageType[];
}

export default function PropertyPhotos({ images }: PropertyPhotosProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Show only first 6 images in grid
  const displayImages = images.slice(0, 6);

  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Henüz fotoğraf eklenmemiş.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayImages.map((image, index) => {
          const imageUrl = getStrapiMedia(image.url);
          return (
            <div
              key={image.id}
              className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(index)}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={image.alternativeText || `Property photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 120px, 128px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium">
                    Büyüt
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative max-w-5xl max-h-[90vh]">
            {getStrapiMedia(images[selectedImage].url) && (
              <Image
                src={getStrapiMedia(images[selectedImage].url)!}
                alt={images[selectedImage].alternativeText || 'Property photo'}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
                className="object-contain"
              />
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}