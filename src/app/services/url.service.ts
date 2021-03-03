import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl: String = environment.baseUrl

  constructor() { }

  /********* COMMON **********/
  uploadFile = `${this.baseUrl}/uploadFile`;


  /********* AUTH **********/
  signin = `${this.baseUrl}/signin`
  forgotPassword = `${this.baseUrl}/forgotPassword`
  changePassword = `${this.baseUrl}/changePassword`

  /********* PAGES **********/
  getProfile = `${this.baseUrl}/getProfile`
  editProfile = `${this.baseUrl}/editProfile`
  destinationTypes = `${this.baseUrl}/destinationTypes`
  destinations = `${this.baseUrl}/destinations`
  hotels = `${this.baseUrl}/hotels`
  tours = `${this.baseUrl}/tours`
  // Sprint-2--Started
  users = `${this.baseUrl}/users`
}
