import { Component, inject } from '@angular/core';

import { CartService } from '../../services/cart.service';

interface NavigationItem {
  id: string;
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
      { id: 'inicio', label: 'Inicio', anchor: '#inicio' },
      { id: 'ceramicas', label: 'Ceramicas', anchor: '#catalogo' },
      { id: 'texteis', label: 'Texteis', anchor: '#catalogo' },
      { id: 'moveis', label: 'Moveis', anchor: '#catalogo' },
      { id: 'sobre', label: 'Sobre', anchor: '#sobre' },
      { id: 'contato', label: 'Contato', anchor: '#contato' }
    ];
  }
}
