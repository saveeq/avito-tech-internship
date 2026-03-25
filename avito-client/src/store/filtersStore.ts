import { create } from 'zustand';
import type { Category, GetItemsParams, SortColumn, SortDirection } from '@/types';

const PAGE_SIZE = 10;

type Layout = 'grid' | 'list';

interface FiltersState {
  q: string;
  categories: Category[];
  needsRevision: boolean;
  sortColumn: SortColumn | undefined;
  sortDirection: SortDirection | undefined;
  page: number;
  layout: Layout;

  setSearch: (q: string) => void;
  toggleCategory: (category: Category) => void;
  setNeedsRevision: (value: boolean) => void;
  setSort: (column: SortColumn, direction: SortDirection) => void;
  setPage: (page: number) => void;
  setLayout: (layout: Layout) => void;
  resetFilters: () => void;
  getQueryParams: () => GetItemsParams;
}

const defaultState = {
  q: '',
  categories: [] as Category[],
  needsRevision: false,
  sortColumn: undefined as SortColumn | undefined,
  sortDirection: undefined as SortDirection | undefined,
  page: 1,
  layout: 'grid' as Layout,
};

export const useFiltersStore = create<FiltersState>((set, get) => ({
  ...defaultState,

  setSearch: (q) => set({ q, page: 1 }),

  toggleCategory: (category) =>
    set((state) => ({
      page: 1,
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
    })),

  setNeedsRevision: (value) => set({ needsRevision: value, page: 1 }),

  setSort: (sortColumn, sortDirection) => set({ sortColumn, sortDirection, page: 1 }),

  setPage: (page) => set({ page }),

  setLayout: (layout) => set({ layout }),

  resetFilters: () =>
    set({
      q: '',
      categories: [],
      needsRevision: false,
      sortColumn: undefined,
      sortDirection: undefined,
      page: 1,
    }),

  getQueryParams: (): GetItemsParams => {
    const { q, categories, needsRevision, sortColumn, sortDirection, page } = get();
    return {
      q: q || undefined,
      categories: categories.length ? categories : undefined,
      needsRevision: needsRevision || undefined,
      sortColumn,
      sortDirection,
      limit: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    };
  },
}));

export { PAGE_SIZE };
