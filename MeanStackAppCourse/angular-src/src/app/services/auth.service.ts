import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: boolean;

  constructor(private http: HttpClient) {
    this.isDev = true;
  }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .post<any>('http://localhost:3000/users/register', user, {
        headers: headers,
      })
      .pipe(map((response) => response));
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .post<any>('http://localhost:3000/users/authenticate', user, {
        headers: headers,
      })
      .pipe(map((response) => response));
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http
      .get<any>('http://localhost:3000/users/profile', { headers: headers })
      .pipe(map((response) => response));
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //Used for getting the JWT token from browser local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
