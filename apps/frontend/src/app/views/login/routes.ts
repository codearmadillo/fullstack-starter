import {Route} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ExchangeComponent} from "./exchange/exchange.component";

export const LOGIN_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: LoginComponent,
    children: [
      { path: 'exchange', component: ExchangeComponent }
    ]
  }
]
