import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  Product,
  ProductListResponse,
  ProductQueryParams,
  TipoEscultura
} from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products = this.createProducts();
  private readonly simulatedLatencyMs = 120;

  public getProducts(params: ProductQueryParams): Observable<ProductListResponse> {
    const filteredProducts = params.type
      ? this.products.filter((product) => product.type === params.type)
      : this.products;
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;

    return of({
      items: filteredProducts.slice(start, end),
      total: filteredProducts.length,
      page: params.page,
      pageSize: params.pageSize
    }).pipe(delay(this.simulatedLatencyMs));
  }

  public getProductByReference(reference: string): Observable<Product | undefined> {
    return of(this.products.find((product) => product.reference === reference)).pipe(
      delay(this.simulatedLatencyMs)
    );
  }

  public getProductsByReferences(
    references: string[],
    page: number,
    pageSize: number
  ): Observable<ProductListResponse> {
    const uniqueReferences = Array.from(new Set(references));
    const filteredProducts = this.products.filter((product) =>
      uniqueReferences.includes(product.reference)
    );
    const total = filteredProducts.length;
    const safePage = total === 0 ? 1 : Math.min(Math.max(page, 1), Math.ceil(total / pageSize));
    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;

    return of({
      items: filteredProducts.slice(start, end),
      total,
      page: safePage,
      pageSize
    }).pipe(delay(this.simulatedLatencyMs));
  }

  private createProducts(): Product[] {
    const referencesByType: Record<TipoEscultura, number[]> = {
      [TipoEscultura.Equino]: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
        101, 102, 103, 104, 105, 106, 107, 126, 157, 165,
        173, 174, 175, 177, 178
      ],
      [TipoEscultura.Ovino]: [
        108, 109, 111, 112, 113, 114, 115, 117, 118, 119,
        120, 122, 127, 133, 134, 136, 138, 139, 140, 142,
        145, 149, 150, 151, 154, 166
      ],
      [TipoEscultura.Bovino]: [
        110, 121, 123, 124, 125, 128, 129, 135, 137, 141,
        143, 144, 146, 147, 148, 152, 153, 155, 156, 159,
        160, 161, 162, 163, 167, 168, 170, 171
      ],
      [TipoEscultura.Outros]: [116, 130, 131, 132, 158, 164, 169, 172, 176]
    };

    const products = Object.entries(referencesByType).flatMap(([type, references]) => {
      const imageFolder = this.getImageFolder(type as TipoEscultura);

      return references.map((referenceNumber) => {
        const reference = String(referenceNumber);

        return {
          id: referenceNumber,
          reference,
          price: this.calculatePrice(referenceNumber),
          image: `assets/${imageFolder}/${reference}.jpeg`,
          description: `Descricao do item de referencia ${reference}.`,
          type: type as TipoEscultura
        };
      });
    });

    return products.sort((first, second) => first.id - second.id);
  }

  private calculatePrice(referenceNumber: number): number {
    return Number((79 + referenceNumber * 3.15).toFixed(2));
  }

  private getImageFolder(tipo: TipoEscultura): string {
    switch (tipo) {
      case TipoEscultura.Ovino:
        return 'ovinos';
      case TipoEscultura.Equino:
        return 'equinos';
      case TipoEscultura.Bovino:
        return 'bovinos';
      default:
        return 'outros';
    }
  }
}
