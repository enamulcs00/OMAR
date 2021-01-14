import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { UrlService } from '../services/url.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private urls: UrlService,
    private http: HttpClient
  ) { }

  login(body) {
    return this.http.post(this.urls.signin, body)
  }

  sendLink(body) {
    return this.http.post(this.urls.forgotPassword, body)
  }

  changePassword(body) {
    return this.http.put(this.urls.changePassword, body)
  }
}
