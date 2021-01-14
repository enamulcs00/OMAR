import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SetInterceptorService {
  // whiteLabelUrl = environment.whiteLabelUrl;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = this.handleRequest(req);
    return next.handle(clonedReq);
  }
  handleRequest(req: HttpRequest<any>) {
    const user = JSON.parse(localStorage.getItem('tamshiyah_admin'));
    let authReq;
    if ((req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'put') && req.body instanceof FormData) {
      authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: user ? user.accessToken : ''
        })
      });
    } else {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: user ? user.accessToken : ''
        })
      });
    }
    return authReq;
  }
}
