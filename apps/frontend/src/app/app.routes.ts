import { Route } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/routes').then((mod) => mod.LOGIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
