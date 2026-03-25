import { useFiltersStore } from '@/store/filtersStore';
import { useItems } from '@/hooks/useItems';
import { AdCard } from '@/components/AdCard';
import { AdRow } from '@/components/AdRow';
import { AdCardSkeleton, AdRowSkeleton } from '@/components/AdCardSkeleton';
import { FiltersSidebar } from '@/components/FiltersSidebar';
import { SearchBar } from '@/components/SearchBar';
import { SortSelect } from '@/components/SortSelect';
import { Pagination } from '@/components/Pagination';
import { LayoutToggle } from '@/components/LayoutToggle';
import { ThemeToggle } from '@/components/ThemeToggle';

export const AdsPage = () => {
  const { layout, getQueryParams } = useFiltersStore();
  const params = getQueryParams();
  const { data, isLoading, isError } = useItems(params);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Шапка */}
        <div>
          <h1 className="text-2xl font-bold">Мои объявления</h1>
          {data && <p className="text-sm text-muted-foreground mt-1">{data.total} объявлений</p>}
        </div>

        <div className="flex items-center gap-3">
          <SearchBar />
          <LayoutToggle />
          <SortSelect />
          <ThemeToggle />
        </div>

        <div className="flex gap-6 items-start">
          <FiltersSidebar />

          <div className="flex-1 flex flex-col gap-4">
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                Не удалось загрузить объявления. Проверьте соединение и попробуйте снова.
              </div>
            )}

            {isLoading ? (
              layout === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <AdCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <AdRowSkeleton key={i} />
                  ))}
                </div>
              )
            ) : data?.items.length === 0 ? (
              <div className="text-center text-gray-400 py-16 text-sm">Объявления не найдены</div>
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {data?.items.map((item) => (
                  <AdCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {data?.items.map((item) => (
                  <AdRow key={item.id} item={item} />
                ))}
              </div>
            )}

            {data && <Pagination total={data.total} />}
          </div>
        </div>
      </div>
    </div>
  );
};
