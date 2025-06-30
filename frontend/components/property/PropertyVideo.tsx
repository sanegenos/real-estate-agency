'use client';

interface PropertyVideoProps {
  videoUrl: string;
}

export default function PropertyVideo({ videoUrl }: PropertyVideoProps) {
  // Extract video ID from YouTube URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  if (!videoId) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">Video URL'si geçersiz veya desteklenmiyor.</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Property Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      ></iframe>
    </div>
  );
}