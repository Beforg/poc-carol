import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { LandingPageComponent } from './features/landing/pages/landing-page.component';

export const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: LandingPageComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	}
];
