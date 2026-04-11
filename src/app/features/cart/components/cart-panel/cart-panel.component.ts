import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CartItem, CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.scss'
})
export class CartPanelComponent {
  private readonly cartService = inject(CartService);

  public readonly items = this.cartService.items;
  public readonly isOpen = this.cartService.isOpen;
  public readonly totalItems = this.cartService.totalItems;
  public readonly totalPrice = this.cartService.totalPrice;

  public closePanel(): void {
    this.cartService.closePanel();
  }

  public increase(item: CartItem): void {
    this.cartService.increaseQuantity(item.id);
  }

  public decrease(item: CartItem): void {
    this.cartService.decreaseQuantity(item.id);
  }

  public remove(item: CartItem): void {
    this.cartService.removeItem(item.id);
  }

  public finalizeOrder(): void {
    if (this.totalItems() === 0) {
      return;
    }

    this.cartService.clearCart();
    this.cartService.closePanel();
  }
}
