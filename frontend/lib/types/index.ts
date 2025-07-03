// frontend/lib/types/index.ts

// Common types
export interface Image {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: Image;
  keywords?: string;
  canonicalURL?: string;
}

// Property types для Strapi v5
export interface Property {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string; // Изменено с union type на string
  type: PropertyType;
  project_status: PropertyStatus;
  listingType: string; // Изменено с union type на string
  
  // Location
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  
  // Features
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor?: number;
  totalFloors?: number;
  garages?: number;
  distanceToBeach?: number;
  
  // Dates
  completionDate?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  
  // Media - в Strapi v5 это уже не в attributes
  gallery?: Image[];
  coverImage?: Image;
  youtubeVideoUrl?: string;
  
  // Content
  installmentPlan?: string;
  propertyCode?: string;
  
  // Relations - в Strapi v5 это объекты, а не массивы
  agent?: Agent;
  features?: Feature[];
  
  // SEO
  seo?: SEO;
  
  locale: string;
}

export type PropertyType = 'villa' | 'apartment' | 'house' | 'penthouse' | 'townhouse' | 'land';
export type PropertyStatus = 'ready' | 'under-construction';
export type CurrencyType = 'USD' | 'EUR' | 'TRY';
export type ListingType = 'sale' | 'rent';

export interface Feature {
  id: number;
  documentId: string;
  name: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Agent types для Strapi v5
export interface Agent {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  bio?: string | any; // Может быть строкой или массивом Strapi blocks
  photo?: Image;
  
  // Social links
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// API types для Strapi v5
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface FilterParams {
  city?: string;
  type?: PropertyType;
  listingType?: string; // Изменено с union type на string
  priceMin?: number;
  priceMax?: number;
  bedroomsMin?: number;
  bedroomsMax?: number;
  areaMin?: number;
  areaMax?: number;
  features?: number[]; // feature IDs
  sort?: string;
  page?: number;
  pageSize?: number;
}