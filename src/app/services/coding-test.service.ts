import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CodeExecutionRequest {
   
    source_code: string;
    language_id: number;
    customInput: string;
  
}

interface CodeSubmission {
  studentId: string | null;
  submittedCode: string;
  languageId: number;
  testId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CodingTestService {
  private baseUrl = 'http://localhost:8082/api/tests';
  private apiUrl = 'http://localhost:8080/api/judge0';

  constructor(private http: HttpClient) {}

  // 📌 Get Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    });
  }

  // ✅ Fetch Questions by Test ID
  getQuestions(testId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/questions/${testId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✅ Fetch Test Details
  getTestDetails(testId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${testId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✅ Submit Code (Backend: submission structure)
  submitCode(submissionData: CodeSubmission): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit-code`, submissionData, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✅ Execute Code (Judge0)
  executeCode(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/execute`, request, {
      responseType: 'text' as 'json'  // 👈 Treat text as JSON so Angular doesn't fail to parse it
    });
  }
  
}
