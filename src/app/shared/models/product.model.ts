export interface Product {
  id: number;
  reference: string;
  price: number;
  image: string;
  description: string;
  type: TipoEscultura;
}

export enum TipoEscultura {
  Ovino = 'Ovino',
  Equino = 'Equino',
  Bovino = 'Bovino',
  Outros = 'Outros'
}

export interface ProductQueryParams {
  page: number;
  pageSize: number;
  type?: TipoEscultura | null;
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}
