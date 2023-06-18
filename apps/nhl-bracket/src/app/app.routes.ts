import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'brackets',
    loadChildren: () => import('./views/brackets/brackets.routes')
  },
  {
    path: 'settings',
    loadComponent: () => import('./views/settings/settings.component')
  },
  {
    path: '',
    redirectTo: 'brackets',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'brackets'
  }
];
