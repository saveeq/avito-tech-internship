import { Skeleton } from '@/components/ui/skeleton';

export const AdCardSkeleton = () => (
  <div className="flex flex-col bg-card rounded-xl border border-border overflow-hidden">
    <Skeleton className="h-40 rounded-none" />
    <div className="flex flex-col gap-2 p-3">
      <Skeleton className="h-4 w-20 rounded-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

export const AdRowSkeleton = () => (
  <div className="flex items-center gap-4 bg-card rounded-xl border border-border p-3">
    <Skeleton className="shrink-0 w-16 h-16 rounded-lg" />
    <div className="flex-1 flex flex-col gap-2">
      <Skeleton className="h-3 w-16 rounded-full" />
      <Skeleton className="h-4 w-48" />
    </div>
    <Skeleton className="h-4 w-20" />
  </div>
);
