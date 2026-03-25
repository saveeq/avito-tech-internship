import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useFiltersStore } from '@/store/filtersStore';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchBar = () => {
  const { q, setSearch } = useFiltersStore();
  const [inputValue, setInputValue] = useState(q);
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  return (
    <div className="relative flex-1">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        placeholder="Найти объявление..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};
