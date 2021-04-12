import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { UTILS } from './utils/Utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (UTILS.isBrowser) {
      const idToken = localStorage.getItem('id_token');

      if (idToken) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + idToken),
        });

        return next.handle(cloned);
      }
    }
    return next.handle(req);
  }
}
