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
  private readonly businessWhatsAppNumber = '5555996483078';

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
    const items = this.items();
    const total = this.totalPrice();

    const orderDetails = items
      .map(item => `${item.quantity}x ${item.title}`)
      .join('\n');

    const formattedTotal = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n${orderDetails}\n\n*Total: ${formattedTotal}*`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.businessWhatsAppNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    this.cartService.clearCart();
    this.cartService.closePanel();
  }
}
