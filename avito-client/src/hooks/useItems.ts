import { useQuery } from '@tanstack/react-query';
import { getItems } from '@/api/items';
import type { GetItemsParams } from '@/types';

export const itemsQueryKey = (params: GetItemsParams) => ['items', params] as const;

export const useItems = (params: GetItemsParams) => {
  return useQuery({
    queryKey: itemsQueryKey(params),
    queryFn: ({ signal }) => getItems(params, signal),
  });
};
