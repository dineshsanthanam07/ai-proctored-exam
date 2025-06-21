import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8082/api/auth'; // Update this URL as needed

  constructor(private http: HttpClient) {}

  registerFaculty(facultyData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-admin`, facultyData);
  }
}
