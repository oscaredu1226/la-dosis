import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { COMMUNITY_PROVIDERS } from './community/community.providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    ...COMMUNITY_PROVIDERS,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
