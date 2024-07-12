import { Routes } from '@angular/router';

//old route
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../loginPage/login/login.component'),
  }
];
