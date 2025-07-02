import axios from 'axios';
import qs from 'qs';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const api = axios.create({
  baseURL: `${strapiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Вспомогательная функция для построения URL с параметрами
export function buildStrapiUrl(path: string, params?: Record<string, any>) {
  const queryString = qs.stringify(params, {
    encodeValuesOnly: true, // Кодировать только значения, не ключи
  });
  
  return `${strapiUrl}/api${path}${queryString ? `?${queryString}` : ''}`;
}

// Улучшенная функция для получения URL медиафайлов
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // Если URL уже полный, возвращаем как есть
  if (url.startsWith('http')) return url;
  
  // Убираем начальный слеш если есть
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  
  // Добавляем базовый URL Strapi
  return `${strapiUrl}/${cleanUrl}`;
}

// Типизированная функция для запросов
export async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
): Promise<T> {
  try {
    // Merge default and user options
    const mergedOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const requestUrl = buildStrapiUrl(path, urlParamsObject);

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error('Fetch API Error:', error);
    throw error;
  }
}