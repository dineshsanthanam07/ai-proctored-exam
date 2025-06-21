import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {
  private baseUrl = 'http://localhost:8082/api/student/enrollment'; // ✅ Corrected base URL

  constructor(private http: HttpClient) {}

  /** ⬇️ Helper Method: Get Auth Headers */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /** ⬇️ Get All Available Courses */
  getAvailableCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses`, { headers: this.getAuthHeaders() });
  }

  /** ⬇️ Get Enrolled Courses for a Student */
  getEnrolledCourses(rollno: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/${rollno}`, { headers: this.getAuthHeaders() });
  }

  /** ⬇️ Enroll in a Course */
  enrollCourse(rollno: string, courseId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/enroll`,
      { rollno, courseId },
      { headers: this.getAuthHeaders() }
    );
  }

  /** ⬇️ Get Pending Enrollment Requests (Admin) */
  getPendingEnrollments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending`, { headers: this.getAuthHeaders() });
  }

  /** ⬆️ Approve or Reject Enrollment (Admin) */
  updateEnrollmentStatus(enrollmentId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/update-status/${enrollmentId}`,
      { status },
      { headers: this.getAuthHeaders() }
    );
  }

  /** ⬇️ Student Login */
  login(roll_no: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:8082/api/auth/student-login`, { roll_no, password });
  }

  /** ⬇️ Extract Student ID from Token */
  getStudentIdFromToken(): string | null {
    return localStorage.getItem('studentId');
  }

  /** ⬇️ Store JWT Token & Role in Local Storage */
  storeToken(token: string, role: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('Role', role);
    localStorage.setItem('studentId', username);
  }

  /** ⬇️ Retrieve JWT Token */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** ⬇️ Retrieve User Role */
  getUserRole(): string | null {
    return localStorage.getItem('Role');
  }

  /** ⬇️ Check if User is Logged In */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** ⬇️ Logout User */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
    localStorage.removeItem('studentId');
  }
}
