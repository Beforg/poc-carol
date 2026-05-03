import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideRouter } from '@angular/router';

import { getPtBrPaginatorIntl } from './core/i18n/mat-paginator-intl-pt-br';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: MatPaginatorIntl,
      useFactory: getPtBrPaginatorIntl
    }
  ]
};
