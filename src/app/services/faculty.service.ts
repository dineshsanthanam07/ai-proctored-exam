import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiUrl = 'http://localhost:8082/api/superadmin';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllFaculty(): Observable<any> {
    return this.http.get(`${this.apiUrl}/faculty-list`, { headers: this.getAuthHeaders() });
  }

  approveFaculty(facultyId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve-admin/${facultyId}`, {}, { headers: this.getAuthHeaders() });
  }

  deleteFaculty(facultyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${facultyId}`, { headers: this.getAuthHeaders() });
  }

  // ✏️ Update/Edit Faculty
  updateFaculty(facultyId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-faculty/${facultyId}`, updatedData, {
      headers: this.getAuthHeaders(),
    });
  }
}
