import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate, CATEGORY_LABELS } from './displayHelpers';

describe('formatPrice', () => {
  it('форматирует число с разделителями и символом ₽', () => {
    expect(formatPrice(1000)).toBe('1\u00a0000 ₽');
  });

  it('возвращает заглушку при null', () => {
    expect(formatPrice(null)).toBe('Цена не указана');
  });

  it('корректно форматирует 0', () => {
    expect(formatPrice(0)).toBe('0 ₽');
  });
});

describe('formatDate', () => {
  it('форматирует ISO-дату на русском', () => {
    const result = formatDate('2024-01-15T00:00:00.000Z');
    // Проверяем что содержит год и месяц
    expect(result).toContain('2024');
    expect(result).toMatch(/январ/i);
  });
});

describe('CATEGORY_LABELS', () => {
  it('содержит все три категории', () => {
    expect(CATEGORY_LABELS.auto).toBe('Авто');
    expect(CATEGORY_LABELS.real_estate).toBe('Недвижимость');
    expect(CATEGORY_LABELS.electronics).toBe('Электроника');
  });
});
