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

finalizeOrder() {
  if (this.totalItems() !== 0) {
    const telefoneWhatsApp = '5555984536737';

    let mensagem = 'Olá! Gostaria de fazer o pedido dos seguintes itens:\n\n';

    this.cartService.items().forEach((item) => {
      mensagem += `🔸 *REF:* ${item.reference}\n`;
      mensagem += `🛒 *Quantidade:* ${item.quantity}\n`;
      mensagem += '\n';
    });

    const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');

    this.cartService.clearCart();
    this.closePanel();
  }
}

}
