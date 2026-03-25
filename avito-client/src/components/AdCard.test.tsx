import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdCard } from './AdCard';
import type { ItemListEntry } from '@/types';

// Мокаем useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockItem: ItemListEntry = {
  id: 1,
  category: 'electronics',
  title: 'iPhone 15 Pro',
  price: 89000,
  needsRevision: false,
};

describe('AdCard', () => {
  it('отображает название и цену', () => {
    render(<AdCard item={mockItem} />);
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText(/89/)).toBeInTheDocument();
  });

  it('отображает категорию', () => {
    render(<AdCard item={mockItem} />);
    expect(screen.getByText('Электроника')).toBeInTheDocument();
  });

  it('не показывает бейдж доработок если needsRevision=false', () => {
    render(<AdCard item={mockItem} />);
    expect(screen.queryByText(/Требует доработок/)).toBeNull();
  });

  it('показывает бейдж доработок если needsRevision=true', () => {
    render(<AdCard item={{ ...mockItem, needsRevision: true }} />);
    expect(screen.getByText(/Требует доработок/)).toBeInTheDocument();
  });

  it('при клике вызывает navigate с правильным путём', () => {
    render(<AdCard item={mockItem} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockNavigate).toHaveBeenCalledWith('/ads/1');
  });

  it('при Enter вызывает navigate', () => {
    render(<AdCard item={mockItem} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('/ads/1');
  });
});
