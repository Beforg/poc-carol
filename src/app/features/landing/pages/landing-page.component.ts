import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AboutComponent } from '../components/about/about.component';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { HeroComponent } from '../components/hero/hero.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeroComponent, CatalogComponent, AboutComponent, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {}
