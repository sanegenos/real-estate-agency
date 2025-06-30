// lib/types/index.ts

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

// Property types
export interface Property {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: 'USD' | 'EUR' | 'TRY';
  type: PropertyType;
  project_status: PropertyStatus;
  listingType: 'sale' | 'rent';
  
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
  
  // Media
  gallery?: Image[];
  coverImage?: Image;
  youtubeVideoUrl?: string;
  
  // Content
  installmentPlan?: string;
  propertyCode?: string;
  
  // Relations
  agent?: Agent;
  features?: Feature[];
  
  // SEO
  seo?: SEO;
  
  locale: string;
}

export type PropertyType = 'villa' | 'apartment' | 'house' | 'penthouse' | 'townhouse' | 'land';
export type PropertyStatus = 'ready' | 'under-construction';

export interface Feature {
  id: number;
  name: string;
  icon?: string;
}

// Agent types
export interface Agent {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  bio?: string;
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

// API types
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
  listingType?: 'sale' | 'rent';
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