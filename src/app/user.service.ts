import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './interfaces/user';

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

  getUser(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      })
    };
    return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
  }

  updateUser(user: User) {
    console.log(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      })
    };
    return this.http.put<User>(this.baseUrl + 'users/', user, httpOptions);
  }

  checkUsername(username: string) {
    return this.http.get<any>(this.baseUrl + 'users/username/' + username);
  }
}
