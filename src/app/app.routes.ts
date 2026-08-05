import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin/pages/admin-page/admin-page.component';
import { LandingPageComponent } from './landing/pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
