import { useFiltersStore } from '@/store/filtersStore';
import type { Category } from '@/types';
import { CATEGORY_LABELS } from '@/lib/displayHelpers';

const CATEGORIES: Category[] = ['auto', 'real_estate', 'electronics'];

export const FiltersSidebar = () => {
  const { categories, needsRevision, toggleCategory, setNeedsRevision, resetFilters } =
    useFiltersStore();

  return (
    <aside className="w-60 shrink-0 flex flex-col gap-5">
      <div className="bg-card rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
        <h2 className="font-semibold text-sm">Фильтры</h2>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Категория</p>
          </div>
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-blue-600"
                checked={categories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span className="text-sm">{CATEGORY_LABELS[category]}</span>
            </label>
          ))}
        </div>

        <hr className="border-gray-100" />

        <label className="flex items-center justify-between gap-2 cursor-pointer">
          <span className="text-sm leading-tight">Только требующие доработок</span>
          <button
            type="button"
            role="switch"
            aria-checked={needsRevision}
            onClick={() => setNeedsRevision(!needsRevision)}
            className={`relative shrink-0 w-10 h-6 rounded-full transition-colors ${
              needsRevision ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                needsRevision ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </label>

        <hr className="border-gray-100" />

        <button
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700 text-left transition-colors"
        >
          Сбросить фильтры
        </button>
      </div>
    </aside>
  );
};
