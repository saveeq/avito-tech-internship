import { Skeleton } from '@/components/ui/skeleton';

export const ItemDetailSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="h-8 w-64" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-72 rounded-xl" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-44" />
      </div>
    </div>
    <Skeleton className="h-24 rounded-xl" />
  </div>
);
