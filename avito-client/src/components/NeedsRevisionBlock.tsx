import type { Item } from '@/types';
import {
  AUTO_PARAM_LABELS,
  REAL_ESTATE_PARAM_LABELS,
  ELECTRONICS_PARAM_LABELS,
} from '@/lib/displayHelpers';

interface NeedsRevisionBlockProps {
  item: Item & { needsRevision: boolean };
}

const getMissingFields = (item: Item): string[] => {
  const missing: string[] = [];

  if (!item.description) missing.push('Описание');

  const labels =
    item.category === 'auto'
      ? AUTO_PARAM_LABELS
      : item.category === 'real_estate'
        ? REAL_ESTATE_PARAM_LABELS
        : ELECTRONICS_PARAM_LABELS;

  for (const [key, label] of Object.entries(labels)) {
    const value = (item.params as Record<string, unknown>)[key];
    if (value === undefined || value === null || value === '') {
      missing.push(label);
    }
  }

  return missing;
};

export const NeedsRevisionBlock = ({ item }: NeedsRevisionBlockProps) => {
  if (!item.needsRevision) return null;

  const missingFields = getMissingFields(item);

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-2">
      <p className="text-sm font-semibold text-amber-800">Требуются доработки</p>
      <p className="text-xs text-amber-700">Не заполнены следующие поля:</p>
      <ul className="flex flex-col gap-1">
        {missingFields.map((field) => (
          <li key={field} className="text-xs text-amber-700 flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-amber-500 shrink-0" />
            {field}
          </li>
        ))}
      </ul>
    </div>
  );
};
