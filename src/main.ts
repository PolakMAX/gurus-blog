import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

// Optionally log environment for debugging
if (environment.env !== 'production') {
  console.log('Running in', environment.env, 'environment');
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
