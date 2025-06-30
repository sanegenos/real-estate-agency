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
  
  return property;
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

  return await fetchAPI<StrapiResponse<Property[]>>('/properties', queryParams);
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

  return await fetchAPI<StrapiResponse<Property[]>>('/properties', queryParams);
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