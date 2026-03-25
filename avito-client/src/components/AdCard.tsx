import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { CATEGORY_LABELS, formatPrice } from '@/lib/displayHelpers';
import type { ItemListEntry } from '@/types';

interface AdCardProps {
  item: ItemListEntry;
}

export const AdCard = ({ item }: AdCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/ads/${item.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/ads/${item.id}`)}
      className="flex flex-col bg-card rounded-xl border border-border overflow-hidden cursor-pointer hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-ring"
    >
      <div className="flex items-center justify-center bg-muted h-40">
        <svg
          className="w-12 h-12 text-muted-foreground"
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

      <div className="flex flex-col gap-1.5 p-3">
        <Badge variant="secondary" className="w-fit text-xs">
          {CATEGORY_LABELS[item.category]}
        </Badge>
        <p className="font-medium text-sm leading-tight line-clamp-2">{item.title}</p>
        <p className="font-semibold text-sm">{formatPrice(item.price)}</p>
        {item.needsRevision && (
          <p className="text-xs text-amber-600 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
            Требует доработок
          </p>
        )}
      </div>
    </div>
  );
};
