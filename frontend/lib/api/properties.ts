import { fetchAPI } from './client';
import { Property, StrapiResponse, FilterParams, Feature } from '@/lib/types';

// Получить все объекты недвижимости с фильтрами
export async function getProperties(params: FilterParams = {}) {
  const {
    city,
    type,
    listingType,
    priceMin,
    priceMax,
    bedroomsMin,
    bedroomsMax,
    areaMin,
    areaMax,
    features,
    sort = 'createdAt:desc',
    page = 1,
    pageSize = 12,
  } = params;

  // Для Strapi v5 используем более простой формат
  const queryParams: any = {
    populate: {
      coverImage: true,
      agent: true,
      features: true,
    },
    sort: [sort],
    pagination: {
      page,
      pageSize,
    },
  };

  // Добавляем фильтры только если они заданы
  const filters: any = {};
  
  if (city) filters.city = { $eq: city };
  if (type) filters.type = { $eq: type };
  if (listingType) filters.listingType = { $eq: listingType };
  
  if (priceMin || priceMax) {
    filters.price = {};
    if (priceMin) filters.price.$gte = priceMin;
    if (priceMax) filters.price.$lte = priceMax;
  }
  
  if (bedroomsMin || bedroomsMax) {
    filters.bedrooms = {};
    if (bedroomsMin) filters.bedrooms.$gte = bedroomsMin;
    if (bedroomsMax) filters.bedrooms.$lte = bedroomsMax;
  }
  
  if (areaMin || areaMax) {
    filters.area = {};
    if (areaMin) filters.area.$gte = areaMin;
    if (areaMax) filters.area.$lte = areaMax;
  }
  
  if (features && features.length > 0) {
    filters.features = { id: { $in: features } };
  }

  if (Object.keys(filters).length > 0) {
    queryParams.filters = filters;
  }

  console.log('Query params:', queryParams);

  return await fetchAPI<StrapiResponse<Property[]>>('/properties', queryParams);
}

// Получить один объект по slug
export async function getPropertyBySlug(slug: string) {
  const queryParams = {
    populate: {
      coverImage: true,
      gallery: true,
      agent: {
        populate: ['photo']
      },
      features: {
        populate: '*'
      },
      seo: true
    },
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  try {
    const response = await fetchAPI<StrapiResponse<Property[]>>('/properties', queryParams);
    
    if (!response.data || response.data.length === 0) {
      return null;
    }
    
    // Проверяем и форматируем features
    const property = response.data[0];
    
    // Обрабатываем features для Strapi v5
    if (property.features && typeof property.features === 'object' && 'data' in property.features) {
      property.features = (property.features as any).data as Feature[];
    }

    // Проверяем и форматируем все необходимые поля
    const safeProperty = {
      ...property,
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      area: property.area || 0,
      price: property.price || 0,
      type: property.type || 'apartment',
      listingType: property.listingType || 'sale',
      currency: property.currency || 'USD',
      city: property.city || '',
      country: property.country || '',
      address: property.address || '',
      title: property.title || '',
      description: property.description || '',
    };
    
    return safeProperty;
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return null;
  }
}

// Получить похожие объекты
export async function getRelatedProperties(
  currentPropertyId: number,
  type: string,
  city: string,
  limit: number = 3
) {
  const queryParams = {
    populate: {
      coverImage: true,
      agent: true
    },
    filters: {
      id: { $ne: currentPropertyId },
      type: { $eq: type },
      city: { $eq: city },
    },
    pagination: {
      limit,
    },
  };

  try {
    return await fetchAPI<StrapiResponse<Property[]>>('/properties', queryParams);
  } catch (error) {
    console.error('Error fetching related properties:', error);
    return { data: [], meta: {} };
  }
}

// Получить избранные объекты для главной страницы
export async function getFeaturedProperties(limit: number = 6) {
  const queryParams = {
    populate: ['coverImage', 'agent'],
    sort: 'createdAt:desc',
    pagination: {
      limit,
    },
  };

  try {
    const response = await fetchAPI<StrapiResponse<Property[]>>('/properties', queryParams);
    
    // Проверяем и очищаем данные
    if (!response?.data || !Array.isArray(response.data)) {
      console.warn('Invalid featured properties response:', response);
      return { data: [], meta: {} };
    }

    // Фильтруем и очищаем каждый объект недвижимости
    const cleanedProperties = response.data
      .filter(property => property && typeof property === 'object' && property.id)
      .map(property => ({
        ...property,
        id: property.id,
        title: String(property.title || ''),
        city: String(property.city || ''),
        country: String(property.country || ''),
        bedrooms: Number(property.bedrooms) || 0,
        bathrooms: Number(property.bathrooms) || 0,
        area: Number(property.area) || 0,
        price: Number(property.price) || 0,
        currency: String(property.currency || 'USD'),
        listingType: String(property.listingType || 'sale'),
        slug: String(property.slug || property.id),
      }));

    return {
      data: cleanedProperties,
      meta: response.meta || {}
    };
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return { data: [], meta: {} };
  }
}

// Получить список городов для фильтра
export async function getCities() {
  try {
    const queryParams = {
      fields: ['city'],
      pagination: {
        limit: 100,
      },
    };

    const response = await fetchAPI<StrapiResponse<Property[]>>('/properties', queryParams);
    
    // Проверяем, что данные существуют
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format:', response);
      return [];
    }
    
    // Извлекаем уникальные города (в Strapi v5 нет attributes)
    const cities = Array.from(new Set(
      response.data
        .map(item => item?.city)
        .filter(Boolean)
    ));
    
    return cities.sort();
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}