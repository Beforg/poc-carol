export interface Product {
  id: number;
  reference: string;
  price: number;
  image: string;
  description: string;
}

export interface ProductQueryParams {
  page: number;
  pageSize: number;
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}
