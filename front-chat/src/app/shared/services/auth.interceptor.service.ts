import { Injectable, Injector } from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const utilService = this.injector.get(UtilService);
    const token = utilService.getLocalStorage('token');
    if (token!) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authRequest);

    } else {
      const otherRequest = request.clone({
      });
      return next.handle(otherRequest);
    }
  }
}
