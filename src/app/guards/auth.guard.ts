import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('tamshiyah_admin') && (state.url !== '/' && state.url !== '/login' && state.url !== '/forgotPassword'
    && state.url !== '/changePassword' && state.url !== '/reset-password')) {
      this.router.navigate(['login']);
      return false;
    } else if (localStorage.getItem('tamshiyah_admin')) {
      if (state.url === '/' || state.url === '/login') {
        this.router.navigateByUrl('/dashboard');
      }
    }

    return true;
  }
}
