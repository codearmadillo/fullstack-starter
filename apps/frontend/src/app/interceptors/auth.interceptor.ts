import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import {RequestHeaders} from "../types/request";
import {IdentityService} from "../services/identity.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly identity: IdentityService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
