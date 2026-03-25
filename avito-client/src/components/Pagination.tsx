import { PAGE_SIZE, useFiltersStore } from '@/store/filtersStore';

interface PaginationProps {
  total: number;
}

export const Pagination = ({ total }: PaginationProps) => {
  const { page, setPage } = useFiltersStore();
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        ←
      </PageButton>

      {getPageNumbers().map((p) => (
        <PageButton key={p} onClick={() => setPage(p)} active={p === page}>
          {p}
        </PageButton>
      ))}

      <PageButton onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        →
      </PageButton>
    </div>
  );
};

const PageButton = ({
  children,
  onClick,
  disabled,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-8 h-8 text-sm rounded-lg border transition-colors
      ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}
      disabled:opacity-40 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);
