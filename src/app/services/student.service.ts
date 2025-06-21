import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8082/api/auth'; // Change this based on your backend API

  constructor(private http: HttpClient) {}

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-student`, studentData);
  }
}
