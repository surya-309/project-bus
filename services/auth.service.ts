import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7248/api/User/';

  constructor(private http: HttpClient) {}

  signUp(userObj: any) {
    return this.http.post<any>(this.baseUrl + 'Post', userObj,{responseType:'text' as 'json'});
  }

  login(loginObj: any) {
    return this.http.post<any>(this.baseUrl + 'Login', loginObj,{responseType:'text' as 'json'});
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
