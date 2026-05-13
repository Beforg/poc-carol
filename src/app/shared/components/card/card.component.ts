import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [CommonModule]
})
export class CardComponent {
  @Input({ required: true })
  public product!: Product;

  @Input()
  public isFavorite = false;

  @Output()
  public readonly addToCart = new EventEmitter<Product>();

  @Output()
  public readonly preview = new EventEmitter<Product>();

  @Output()
  public readonly toggleFavorite = new EventEmitter<Product>();

  public onAddToCart(event?: Event): void {
    event?.stopPropagation();
    this.emitAddToCart();
  }

  public onPreview(): void {
    this.preview.emit(this.product);
  }

  public onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.product);
  }

  private emitAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
