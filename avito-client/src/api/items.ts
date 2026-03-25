import { apiClient } from './client';
import type { GetItemsParams, Item, ItemUpdateIn, ItemsGetOut } from '@/types';

export const getItems = async (
  params: GetItemsParams,
  signal?: AbortSignal
): Promise<ItemsGetOut> => {
  const categories = params.categories?.join(',');

  const { data } = await apiClient.get<ItemsGetOut>('/items', {
    params: { ...params, categories },
    signal,
  });

  return data;
};

export const getItem = async (
  id: number,
  signal?: AbortSignal
): Promise<Item & { needsRevision: boolean }> => {
  const { data } = await apiClient.get<Item & { needsRevision: boolean }>(`/items/${id}`, {
    signal,
  });

  return data;
};

export const updateItem = async (
  id: number,
  body: ItemUpdateIn,
  signal?: AbortSignal
): Promise<{ success: boolean }> => {
  const { data } = await apiClient.put<{ success: boolean }>(`/items/${id}`, body, {
    signal,
  });

  return data;
};
