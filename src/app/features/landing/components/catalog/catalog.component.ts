import { Component, inject } from '@angular/core';

import { CartService } from '../../../../core/services/cart.service';
import { ProductService } from '../../../../core/services/product.service';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  public readonly products = this.loadProducts();

  public addProduct(product: Product): void {
    this.cartService.addProduct(product);
  }

  public trackByProductId(_: number, product: Product): number {
    return this.getProductId(product);
  }

  private loadProducts(): Product[] {
    return this.productService.getProducts();
  }

  private getProductId(product: Product): number {
    return product.id;
  }
}
