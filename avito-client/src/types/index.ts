export type Category = 'auto' | 'real_estate' | 'electronics';

export type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

export type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

export type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

export type ItemParams = AutoItemParams | RealEstateItemParams | ElectronicsItemParams;

export type Item = {
  id: number;
  title: string;
  description?: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  needsRevision: boolean;
} & (
  | { category: 'auto'; params: AutoItemParams }
  | { category: 'real_estate'; params: RealEstateItemParams }
  | { category: 'electronics'; params: ElectronicsItemParams }
);

export type ItemListEntry = {
  id: number;
  category: Category;
  title: string;
  price: number | null;
  needsRevision: boolean;
};

export type ItemsGetOut = {
  items: ItemListEntry[];
  total: number;
};

export type ItemUpdateIn = {
  category: Category;
  title: string;
  description?: string;
  price: number;
  params: ItemParams;
};

export type SortColumn = 'title' | 'createdAt' | 'price';
export type SortDirection = 'asc' | 'desc';

export type GetItemsParams = {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: boolean;
  categories?: Category[];
  sortColumn?: SortColumn;
  sortDirection?: SortDirection;
};
