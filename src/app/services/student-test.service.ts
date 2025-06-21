import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentTestService {
  private baseUrl = 'http://localhost:8082/api/tests';

  constructor(private http: HttpClient) {}

  getAvailableTests(rollno: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/available/${rollno}`);
  }

  submitTest(submissionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, submissionData);
  }
}
