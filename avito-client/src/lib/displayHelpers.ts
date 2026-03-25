import type {
  Category,
  AutoItemParams,
  RealEstateItemParams,
  ElectronicsItemParams,
} from '@/types';

export const CATEGORY_LABELS: Record<Category, string> = {
  auto: 'Авто',
  real_estate: 'Недвижимость',
  electronics: 'Электроника',
};

export const formatPrice = (price: number | null): string => {
  if (price === null) return 'Цена не указана';
  return `${price.toLocaleString('ru-RU')} ₽`;
};

export const AUTO_PARAM_LABELS: Record<keyof AutoItemParams, string> = {
  brand: 'Марка',
  model: 'Модель',
  yearOfManufacture: 'Год выпуска',
  transmission: 'Коробка передач',
  mileage: 'Пробег (км)',
  enginePower: 'Мощность (л.с.)',
};

export const REAL_ESTATE_PARAM_LABELS: Record<keyof RealEstateItemParams, string> = {
  type: 'Тип',
  address: 'Адрес',
  area: 'Площадь (м²)',
  floor: 'Этаж',
};

export const ELECTRONICS_PARAM_LABELS: Record<keyof ElectronicsItemParams, string> = {
  type: 'Тип',
  brand: 'Бренд',
  model: 'Модель',
  condition: 'Состояние',
  color: 'Цвет',
};

export const TRANSMISSION_LABELS: Record<string, string> = {
  automatic: 'Автомат',
  manual: 'Механика',
};

export const REAL_ESTATE_TYPE_LABELS: Record<string, string> = {
  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната',
};

export const ELECTRONICS_TYPE_LABELS: Record<string, string> = {
  phone: 'Телефон',
  laptop: 'Ноутбук',
  misc: 'Другое',
};

export const CONDITION_LABELS: Record<string, string> = {
  new: 'Новое',
  used: 'Б/у',
};

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
