export interface Product extends ProductBody {
  id: string;
}

export interface ProductBody {
  name: string;
  description: string;
  price: number;
  category: string;
  featured: boolean;
  createdAt: Date;
}

export interface SearchProductFilter {
  name: string[],
  category: string[]
}