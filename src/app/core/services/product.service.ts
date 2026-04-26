import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  Product,
  ProductListResponse,
  ProductQueryParams
} from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products = this.createProducts();
  private readonly simulatedLatencyMs = 120;

  public getProducts(params: ProductQueryParams): Observable<ProductListResponse> {
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;

    return of({
      items: this.products.slice(start, end),
      total: this.products.length,
      page: params.page,
      pageSize: params.pageSize
    }).pipe(delay(this.simulatedLatencyMs));
  }

  public getProductByReference(reference: string): Observable<Product | undefined> {
    return of(this.products.find((product) => product.reference === reference)).pipe(
      delay(this.simulatedLatencyMs)
    );
  }

  private createProducts(): Product[] {
    const totalAssets = 107;

    return Array.from({ length: totalAssets }, (_, index) => {
      const reference = String(index + 1);

      return {
        id: index + 1,
        reference,
        price: this.calculatePrice(index + 1),
        image: `assets/${reference}.jpeg`,
        description: `Descricao do item de referencia ${reference}.`
      };
    });
  }

  private calculatePrice(referenceNumber: number): number {
    return Number((79 + referenceNumber * 3.15).toFixed(2));
  }
}
