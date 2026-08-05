import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing/pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/pages/admin-page/admin-page.component').then(
        ({ AdminPageComponent }) => AdminPageComponent
      )
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/not-found-page/not-found-page.component').then(
        ({ NotFoundPageComponent }) => NotFoundPageComponent
      )
  }
];
