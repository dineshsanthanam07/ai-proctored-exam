import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const ace: any;

@Component({
  selector: 'app-submission-detail',
  templateUrl: './submission-details.component.html',
  styleUrls: ['./submission-details.component.css']
})
export class SubmissionDetailsComponent implements OnInit {
  submissionId!: number;
  studentId!: string;
  token: string = localStorage.getItem('token') || '';
  submission: any;
  testDetails: any;
  questions: any[] = [];
  selectedLanguage: number = 71;
  customInput: string = '';
  output: string = '';
  editor: any;
  code: string = '';

  languages = [
    { id: 71, name: 'Python (3.8.1)' },
    { id: 50, name: 'C (GCC 9.2.0)' },
    { id: 54, name: 'C++ (G++ 9.2.0)' },
    { id: 62, name: 'Java (OpenJDK 13.0.1)' },
    { id: 63, name: 'JavaScript (Node.js 12.14.0)' }
  ];

  @ViewChild('editor', { static: true }) private editorRef!: ElementRef;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.submissionId = Number(this.route.snapshot.paramMap.get('submissionId'));
    this.studentId = this.route.snapshot.paramMap.get('studentId') || '';
    this.fetchSubmission();
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  fetchSubmission(): void {
    const url = `http://localhost:8082/api/tests/submission/${this.submissionId}`;
    this.http.get<any>(url, { headers: this.getAuthHeaders() }).subscribe(
      (res) => {
        this.submission = res;
        this.testDetails = res.test;
        this.questions = res.test.questions || [];
        this.selectedLanguage = res.languageId;
        this.code = res.submittedCode || '';
        this.customInput = '';  // Reset or fetch if stored somewhere
        this.initializeEditor(this.code);
      },
      (err) => console.error('Error fetching submission:', err)
    );
  }

  initializeEditor(code: string): void {
    this.editor = ace.edit(this.editorRef.nativeElement);
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode('ace/mode/' + this.getAceMode(this.selectedLanguage));
    this.editor.setValue(code || '', -1);
    this.editor.setReadOnly(true);
    this.editor.setOptions({
      fontSize: '14px',
      wrap: true,
    });
  }

  getAceMode(languageId: number): string {
    switch (languageId) {
      case 71: return 'python';
      case 50: return 'c_cpp';
      case 54: return 'c_cpp';
      case 62: return 'java';
      case 63: return 'javascript';
      default: return 'text';
    }
  }

  executeCode() {
    // Get latest code from editor if editable (optional)
    // this.code = this.editor.getValue();

    const requestData = {
      source_code: this.code,
      language_id: this.selectedLanguage,
      customInput: this.customInput.trim() || '',  // Judge0 expects input as 'stdin'
      wait: true // Wait for execution result in one call
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Replace this URL with your Judge0 API endpoint
    const judge0Url = 'http://localhost:8080/api/judge0/execute';

this.http.post(judge0Url, requestData, {
  headers,
  responseType: 'text' // 👈 Tell Angular to expect plain text, not JSON
}).subscribe(
  (response: string) => {
    console.log('Judge0 response:', response);
    this.output = response;
  },
  (error) => {
    console.error('Execution error:', error);
  }
);

  }
}
