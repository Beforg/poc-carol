import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../../shared/models/product.model';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);
  private readonly panelOpen = signal(false);

  public readonly items = computed(() => this.cartItems());
  public readonly isOpen = computed(() => this.panelOpen());
  public readonly totalItems = computed(() => this.calculateTotalItems(this.cartItems()));
  public readonly totalPrice = computed(() => this.calculateTotalPrice(this.cartItems()));

  public addProduct(product: Product): void {
    this.cartItems.update((items) => this.addOrIncreaseItem(items, product));
    this.openPanel();
  }

  public increaseQuantity(productId: number): void {
    this.cartItems.update((items) => this.updateItemQuantity(items, productId, 1));
  }

  public decreaseQuantity(productId: number): void {
    this.cartItems.update((items) => this.updateItemQuantity(items, productId, -1));
  }

  public removeItem(productId: number): void {
    this.cartItems.update((items) => items.filter((item) => item.id !== productId));
  }

  public clearCart(): void {
    this.cartItems.set([]);
  }

  public togglePanel(): void {
    this.panelOpen.update((isOpen) => !isOpen);
  }

  public openPanel(): void {
    this.panelOpen.set(true);
  }

  public closePanel(): void {
    this.panelOpen.set(false);
  }

  private addOrIncreaseItem(items: CartItem[], product: Product): CartItem[] {
    const existingItem = items.find((item) => item.id === product.id);

    if (!existingItem) {
      return [...items, { ...product, quantity: 1 }];
    }

    return items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  private updateItemQuantity(items: CartItem[], productId: number, delta: number): CartItem[] {
    return items
      .map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(0, item.quantity + delta)
        };
      })
      .filter((item) => item.quantity > 0);
  }

  private calculateTotalItems(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  private calculateTotalPrice(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
