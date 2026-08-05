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
    redirectTo: ''
  }
];
