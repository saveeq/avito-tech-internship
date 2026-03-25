import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { useFiltersStore } from '@/store/filtersStore';

// Сбрасываем стор перед каждым тестом
beforeEach(() => {
  useFiltersStore.setState({ page: 1 });
});

describe('Pagination', () => {
  it('не рендерится при одной странице', () => {
    const { container } = render(<Pagination total={10} />);
    expect(container.firstChild).toBeNull();
  });

  it('не рендерится при пустом списке', () => {
    const { container } = render(<Pagination total={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('показывает кнопки страниц', () => {
    render(<Pagination total={42} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('кнопка "←" задизейблена на первой странице', () => {
    render(<Pagination total={42} />);
    expect(screen.getByText('←')).toBeDisabled();
  });

  it('кнопка "→" активна на первой странице', () => {
    render(<Pagination total={42} />);
    expect(screen.getByText('→')).not.toBeDisabled();
  });

  it('клик по странице обновляет стор', () => {
    render(<Pagination total={42} />);
    fireEvent.click(screen.getByText('2'));
    expect(useFiltersStore.getState().page).toBe(2);
  });

  it('клик "→" переходит на следующую страницу', () => {
    render(<Pagination total={42} />);
    fireEvent.click(screen.getByText('→'));
    expect(useFiltersStore.getState().page).toBe(2);
  });
});
