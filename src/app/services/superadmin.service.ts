import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiUrl = 'http://localhost:8082/api/superadmin/dashboard'; // API endpoint

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }
}
