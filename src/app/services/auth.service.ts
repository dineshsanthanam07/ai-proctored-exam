import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8082/api/auth'; // Backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token'); // Clear token on logout
  }
}
