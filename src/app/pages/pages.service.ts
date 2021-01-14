import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UrlService } from '../services/url.service'

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(
    private urls: UrlService,
    private http: HttpClient
  ) { }

  uploadFile(body) {
    return this.http.post(this.urls.uploadFile, body)
  }

  getProfile() {
    return this.http.get(this.urls.getProfile)
  }

  updateProfile(body) {
    return this.http.put(this.urls.editProfile, body)
  }
}
