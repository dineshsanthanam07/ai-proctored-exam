import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodingTestService {
  private apiUrl = 'http://localhost:2358/submissions'; // Your local Judge0 instance

  constructor(private http: HttpClient) {}

  submitCode(submissionData: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      source_code: submissionData.sourceCode,
      language_id: submissionData.languageId, // 62 for Java
      stdin: submissionData.input, // Test case input
      expected_output: submissionData.expectedOutput, // Expected output for validation
    });
  }

  getSubmission(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${token}`);
  }
}
