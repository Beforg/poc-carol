import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({ required: true })
  public product!: Product;

  @Output()
  public readonly addToCart = new EventEmitter<Product>();

  public onAddToCart(): void {
    this.emitAddToCart();
  }

  private emitAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
