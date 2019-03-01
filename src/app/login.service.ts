import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';
  isLoggedIn = localStorage.getItem('token') !== null;
  redirectUrl: string;

  constructor(private http: HttpClient) {
  }

  logIn(username: string, password: string) {
    const body = {
      'username': username,
      'password': password,
    };
    return this.http.post<any>(this.baseUrl + 'login/', body);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }
}
