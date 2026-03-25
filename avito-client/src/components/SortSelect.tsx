import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFiltersStore } from '@/store/filtersStore';
import type { SortColumn, SortDirection } from '@/types';

type SortOption = {
  value: string;
  label: string;
  column: SortColumn;
  direction: SortDirection;
};

const SORT_OPTIONS: SortOption[] = [
  {
    value: 'createdAt_desc',
    label: 'По новизне (сначала новые)',
    column: 'createdAt',
    direction: 'desc',
  },
  {
    value: 'createdAt_asc',
    label: 'По новизне (сначала старые)',
    column: 'createdAt',
    direction: 'asc',
  },
  { value: 'price_asc', label: 'Сначала дешёвые', column: 'price', direction: 'asc' },
  { value: 'price_desc', label: 'Сначала дорогие', column: 'price', direction: 'desc' },
  { value: 'title_asc', label: 'По названию (А-Я)', column: 'title', direction: 'asc' },
  { value: 'title_desc', label: 'По названию (Я-А)', column: 'title', direction: 'desc' },
];

export const SortSelect = () => {
  const { sortColumn, sortDirection, setSort } = useFiltersStore();
  const currentValue = sortColumn && sortDirection ? `${sortColumn}_${sortDirection}` : '';

  const handleChange = (value: string) => {
    const option = SORT_OPTIONS.find((o) => o.value === value);
    if (option) setSort(option.column, option.direction);
  };

  return (
    <Select value={currentValue} onValueChange={handleChange}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
