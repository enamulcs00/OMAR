import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
// import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class GetInterceptorService {

  constructor(
    // private comm: CommonService,
    private router: Router,
    private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let whiteLabel;
    let theme;
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // this.comm.showLoader = false;
      }
    }, (error: any) => {
      // this.comm.showLoader = false;
      if (error['status'] === 401) {
        this.toastr.error('Your session is expired, please log in.');
        if (localStorage.getItem('whiteLabelData')) {
          whiteLabel = localStorage.getItem('whiteLabelData');
        }
        if (localStorage.getItem('theme')) {
          theme = localStorage.getItem('theme');
        }
        localStorage.clear();
        if (whiteLabel) {
          localStorage.setItem('whiteLabelData', whiteLabel);
          const wlData = JSON.parse(whiteLabel);
          document.documentElement.style.setProperty('--sidebar', wlData['colorCodes'].primary);
          document.documentElement.style.setProperty('--topNavBar', wlData['colorCodes'].primary);
          document.documentElement.style.setProperty('--contentBackground', '#f8f8f8');
          document.documentElement.style.setProperty('--sideFaColorButton', wlData['colorCodes'].text);
          document.documentElement.style.setProperty('--themeBackgroundDefault', '#ffffff');
          document.documentElement.style.setProperty('--textColorDefault', '#282C3F');
          document.documentElement.style.setProperty('--contentMainHeadingDefault', '#535353');
        }
        if (theme) {
          localStorage.setItem('theme', theme);
        }
        return this.router.navigate(['login']);
      }
    }));
  }
}
