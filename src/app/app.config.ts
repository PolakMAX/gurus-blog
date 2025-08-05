import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

// Example: use environment.apiUrl for global providers if needed
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // You can provide environment here if needed
    { provide: 'ENVIRONMENT', useValue: environment }
  ]
};
