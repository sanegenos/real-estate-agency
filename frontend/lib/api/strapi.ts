// real-estate/frontend/lib/api/strapi.ts
export function getStrapiMedia(mediaUrl?: string): string {
  if (!mediaUrl) return '';
  // если уже абсолютный
  if (mediaUrl.startsWith('http') || mediaUrl.startsWith('//')) {
    return mediaUrl.startsWith('//')
      ? `https:${mediaUrl}`
      : mediaUrl;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${mediaUrl}`;
}
