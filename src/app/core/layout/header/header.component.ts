import { Component, inject } from '@angular/core';

import { CartService } from '../../services/cart.service';

interface NavigationItem {
  label: string;
  anchor: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly cartService = inject(CartService);

  public readonly totalItems = this.cartService.totalItems;
  public readonly navigation = this.buildNavigation();

  public onToggleCart(): void {
    this.cartService.togglePanel();
  }

  private buildNavigation(): NavigationItem[] {
    return [
      { label: 'Inicio', anchor: '#inicio' },
      { label: 'Ceramicas', anchor: '#catalogo' },
      { label: 'Texteis', anchor: '#catalogo' },
      { label: 'Moveis', anchor: '#catalogo' },
      { label: 'Sobre', anchor: '#sobre' },
      { label: 'Contato', anchor: '#contato' }
    ];
  }
}
