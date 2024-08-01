import { Routes } from '@angular/router';
import LoginComponent from './pages/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    // loadComponent: () => import('../loginPage/login/login.component'),
    component:LoginComponent
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component'),
  //  canActivate: [authGuard] 
  },
  {
    path: 'reasons',
    loadComponent: () =>
      import('./pages/meters/off-merter-reasons/off-merter-reasons.component'),
  },

  {
    path: 'fixMeters',
    loadComponent: () =>
      import('./pages/meters/fix-meters/fix-meters.component'),
  },
  {
    path: 'cards',
    loadComponent: () => import('./pages/card/cards/cards.component'),
  },
  {
    path: 'dataTransfer',
    loadComponent: () =>
      import('./pages/card/data-transfer/data-transfer.component'),
  },
  {
    path: 'usersSettings',
    loadComponent: () =>
      import('./pages/users/users-settings/users-settings.component'),
  },
  {
    path: 'usersPermissions',
    loadComponent: () =>
      import('./pages/users/users-permissions/users-permissions.component'),
  },
  {
    path: 'totalOffMeterReport',
    loadComponent: () =>
      import(
        './pages/reports/total-off-meter-report/total-off-meter-report.component'
      ),
  },
  {
    path: 'offMeterReport',
    loadComponent: () =>
      import('./pages/reports/off-meter-report/off-meter-report.component'),
  },
];
