import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Faculty } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:8082/api/superadmin/courses';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  getFacultyId(userId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8082/api/admin/courses/faculty-id/${userId}`, { headers: this.getAuthHeaders() });
  }
  
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/all-courses`, { headers: this.getAuthHeaders() });
  }

  getAllFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`${this.apiUrl}/faculty-list`, { headers: this.getAuthHeaders() });
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/create`, course, { headers: this.getAuthHeaders() });
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${courseId}`, { headers: this.getAuthHeaders() });
  }
}