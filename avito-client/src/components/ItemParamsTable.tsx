import type { Item } from '@/types';
import {
  AUTO_PARAM_LABELS,
  REAL_ESTATE_PARAM_LABELS,
  ELECTRONICS_PARAM_LABELS,
  TRANSMISSION_LABELS,
  REAL_ESTATE_TYPE_LABELS,
  ELECTRONICS_TYPE_LABELS,
  CONDITION_LABELS,
} from '@/lib/displayHelpers';

interface ItemParamsTableProps {
  item: Item;
}

const formatParamValue = (key: string, value: unknown): string => {
  if (value === undefined || value === null || value === '') return '—';
  if (key === 'transmission') return TRANSMISSION_LABELS[value as string] ?? String(value);
  if (key === 'type') {
    return (
      REAL_ESTATE_TYPE_LABELS[value as string] ??
      ELECTRONICS_TYPE_LABELS[value as string] ??
      String(value)
    );
  }
  if (key === 'condition') return CONDITION_LABELS[value as string] ?? String(value);
  return String(value);
};

export const ItemParamsTable = ({ item }: ItemParamsTableProps) => {
  const labels =
    item.category === 'auto'
      ? AUTO_PARAM_LABELS
      : item.category === 'real_estate'
        ? REAL_ESTATE_PARAM_LABELS
        : ELECTRONICS_PARAM_LABELS;

  const entries = Object.entries(labels) as [string, string][];

  return (
    <div className="flex flex-col divide-y divide-border">
      {entries.map(([key, label]) => (
        <div key={key} className="flex justify-between py-2.5 text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-right">
            {formatParamValue(key, (item.params as Record<string, unknown>)[key])}
          </span>
        </div>
      ))}
    </div>
  );
};
