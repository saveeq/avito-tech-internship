import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useItem } from '@/hooks/useItem';
import { ItemParamsTable } from '@/components/ItemParamsTable';
import { NeedsRevisionBlock } from '@/components/NeedsRevisionBlock';
import { ItemDetailSkeleton } from '@/components/ItemDetailSkeleton';
import { CATEGORY_LABELS, formatPrice, formatDate } from '@/lib/displayHelpers';

export const AdDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemId = Number(id);

  const { data: item, isLoading, isError } = useItem(itemId);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Button
          variant="ghost"
          className="w-fit -ml-2 text-muted-foreground"
          onClick={() => navigate('/ads')}
        >
          ← Назад к списку
        </Button>

        {isLoading && <ItemDetailSkeleton />}

        {isError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 text-destructive p-4 text-sm">
            Не удалось загрузить объявление. Возможно, оно было удалено или недоступно.
          </div>
        )}

        {item && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{CATEGORY_LABELS[item.category]}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <p className="text-xl font-semibold">{formatPrice(item.price)}</p>
              </div>

              <Button onClick={() => navigate(`/ads/${item.id}/edit`)}>Редактировать</Button>
            </div>

            <NeedsRevisionBlock item={item} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center bg-muted rounded-xl h-72">
                <svg
                  className="w-16 h-16 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-sm">Характеристики</h2>
                <ItemParamsTable item={item} />
              </div>
            </div>

            {item.description ? (
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-sm">Описание</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Описание не заполнено</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
