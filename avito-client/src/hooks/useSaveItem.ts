import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem } from '@/api/items';
import { itemQueryKey } from '@/hooks/useItem';
import type { ItemUpdateIn } from '@/types';

export const useSaveItem = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ItemUpdateIn) => updateItem(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemQueryKey(id) });
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
