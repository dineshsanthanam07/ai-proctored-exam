import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.css']
})
export class ExamResultsComponent implements OnInit {
  facultyId: string = localStorage.getItem('userId') || '';
  token: string = localStorage.getItem('token') || '';

  tests: any[] = [];
  selectedTestId: number | null = null;

  students: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadTests();
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  loadTests(): void {
    const url = `http://localhost:8082/api/tests/faculty/${this.facultyId}`;
    this.http.get<any[]>(url, { headers: this.getAuthHeaders() }).subscribe(
      (res) => {
        this.tests = res;
      },
      (err) => {
        console.error('Error loading tests:', err);
      }
    );
  }

  onTestSelected(): void {
    if (this.selectedTestId) {
      const url = `http://localhost:8082/api/tests/test/${this.selectedTestId}`;
      this.http.get<any[]>(url, { headers: this.getAuthHeaders() }).subscribe(
        (res) => {
          this.students = res;
        },
        (err) => {
          console.error('Error loading student submissions:', err);
        }
      );
    }
  }

  onViewSubmission(student: any): void {
    const submissionId = student.submissionId || student.id;
    const studentId = student.studentId || student.id;
    const url = `/admin/submission-details/${submissionId}/${studentId}`;
    window.open(url, '_blank');
  }


  getLanguageName(languageId: number): string {
    const languageMap: { [key: number]: string } = {
      50: 'C',
      54: 'C++',
      62: 'Java',
      71: 'Python 3',
      63: 'JavaScript',
      68: 'MySQL',
      72: 'Ruby',
      73: 'PHP',
      74: 'C#'
    };
    return languageMap[languageId] || `Unknown (ID: ${languageId})`;
  }
}
