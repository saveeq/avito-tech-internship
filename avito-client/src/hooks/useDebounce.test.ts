import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('возвращает исходное значение сразу', () => {
    const { result } = renderHook(() => useDebounce('hello', 400));
    expect(result.current).toBe('hello');
  });

  it('не обновляет значение до истечения задержки', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('hello');
  });

  it('обновляет значение после задержки', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'hello' },
    });

    rerender({ value: 'world' });

    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current).toBe('world');
  });

  it('сбрасывает таймер при быстрых изменениях', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 'c' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Ещё не прошло 400мс с последнего изменения
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('c');
  });
});
