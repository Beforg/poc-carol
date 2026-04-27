import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';

interface NavigationItem {
  id: string;
  label: string;
  anchor: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly cartService = inject(CartService);
  private readonly document = inject(DOCUMENT);
  private readonly themeStorageKey = 'madero-theme';

  public readonly totalItems = this.cartService.totalItems;
  public readonly navigation = this.buildNavigation();
  public readonly isDarkMode = signal(false);

  constructor() {
    this.initializeTheme();
  }

  public onToggleCart(): void {
    this.cartService.togglePanel();
  }

  public onToggleTheme(): void {
    const nextIsDark = !this.isDarkMode();
    this.applyTheme(nextIsDark);
    this.document.defaultView?.localStorage.setItem(this.themeStorageKey, nextIsDark ? 'dark' : 'light');
  }

  private buildNavigation(): NavigationItem[] {
    return [
      { id: 'inicio', label: 'Inicio', anchor: '#inicio' },
      { id: 'catalogo', label: 'Catalogo', anchor: '#catalogo' },
      { id: 'contato', label: 'Contato', anchor: '#contato' }
    ];
  }

  private initializeTheme(): void {
    const savedTheme = this.document.defaultView?.localStorage.getItem(this.themeStorageKey);
    const prefersDark =
      this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    this.applyTheme(shouldUseDark);
  }

  private applyTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

}
