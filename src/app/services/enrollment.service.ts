import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:8082/api/student/enrollment';

  constructor(private http: HttpClient) {}
   private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      if (token) {
        return new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
      }
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

  /** Fetch Pending Enrollments (Admin Only) */
  getPendingEnrollments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending`, { headers: this.getAuthHeaders() });
  }

  /** Approve or Reject Enrollment Request */
  updateEnrollmentStatus(enrollmentId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-status/${enrollmentId}`, { status }, { headers: this.getAuthHeaders() });
  }
}
