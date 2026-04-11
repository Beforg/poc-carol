import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CartPanelComponent } from '../../../features/cart/components/cart-panel/cart-panel.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartPanelComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {}
