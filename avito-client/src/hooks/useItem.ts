import { useQuery } from '@tanstack/react-query';
import { getItem } from '@/api/items';

export const itemQueryKey = (id: number) => ['item', id] as const;

export const useItem = (id: number) => {
  return useQuery({
    queryKey: itemQueryKey(id),
    queryFn: ({ signal }) => getItem(id, signal),
    enabled: Number.isFinite(id),
  });
};
