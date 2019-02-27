import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://media.mw.metropolia.fi/wbma/';

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string, fullName: string) {
    const body: any = {
      'username': username,
      'password': password,
      'email': email,
      'full_name': fullName
    };
    console.log(body);
    return this.http.post<any>(this.baseUrl + 'users/', body);
  }

  checkUsername(username: string) {
    return this.http.get<any>(this.baseUrl + 'users/username/' + username);
  }
}
