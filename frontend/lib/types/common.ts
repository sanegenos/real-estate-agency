// lib/types/common.ts
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

export interface Translation {
  locale: string;
  [key: string]: any;
}

// lib/types/property.ts
export interface Property {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    price: number;
    currency: 'USD' | 'EUR' | 'TRY';
    type: PropertyType;
    status: PropertyStatus;
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
    area: number; // in square meters
    floor?: number;
    totalFloors?: number;
    garages?: number;
    distanceToBeach?: number; // in meters
    
    // Dates
    completionDate?: string;
    listedAt: string;
    updatedAt: string;
    
    // Media
    gallery: Image[];
    coverImage?: Image;
    videos?: Video[];
    documents?: Document[];
    
    // Relations
    agent?: Agent;
    features?: Feature[];
    labels?: Label[];
    
    // SEO
    seo?: SEO;
    
    // Translations
    localizations?: Translation[];
  };
}

export type PropertyType = 'villa' | 'apartment' | 'house' | 'penthouse' | 'townhouse' | 'land';
export type PropertyStatus = 'ready' | 'under-construction';

export interface Feature {
  id: number;
  name: string;
  icon?: string;
}

export interface Label {
  id: number;
  name: string;
  slug: string;
}

export interface Video {
  id: number;
  url: string;
  provider: 'youtube' | 'vimeo' | 'custom';
  title?: string;
}

export interface Document {
  id: number;
  name: string;
  url: string;
  size: number;
  ext: string;
}

// lib/types/agent.ts
export interface Agent {
  id: number;
  attributes: {
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
    
    // Stats
    propertiesCount?: number;
    yearsOfExperience?: number;
    
    // Relations
    properties?: Property[];
    
    createdAt: string;
    updatedAt: string;
  };
}

// lib/types/page.ts
export interface Page {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImage?: Image;
    images?: Image[];
    videos?: Video[];
    documents?: Document[];
    
    // SEO
    seo?: SEO;
    
    // Status
    publishedAt?: string;
    updatedAt: string;
    
    // Translations
    localizations?: Translation[];
  };
}

// lib/types/post.ts
export interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImage?: Image;
    images?: Image[];
    videos?: Video[];
    
    // SEO
    seo?: SEO;
    
    // Meta
    author?: string;
    category?: Category;
    tags?: Tag[];
    
    // Status
    publishedAt?: string;
    updatedAt: string;
    
    // Translations
    localizations?: Translation[];
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// lib/types/api.ts
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

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
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