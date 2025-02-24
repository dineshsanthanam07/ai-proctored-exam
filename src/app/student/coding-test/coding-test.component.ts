import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as ace from 'ace-builds';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coding-test',
  templateUrl: './coding-test.component.html',
  styleUrls: ['./coding-test.component.css']
})
export class CodingTestComponent implements AfterViewInit {
  @ViewChild('editor') private editorRef!: ElementRef;
  code: string = '# Write your code here...';
  selectedLanguage: number = 71; // Default language ID (Python)
  customInput: string = '';
  output: string | null = null;
  testCaseResult: string | null = null;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    const editor = ace.edit(this.editorRef.nativeElement);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/python');
    editor.session.on('change', () => {
      this.code = editor.getValue();
    });
  }

  // Function to execute custom input
  executeCode() {
    const submissionData = {
      submission: {
        sourceCode: this.code,
        languageId: this.selectedLanguage
      }
    };

    this.http.post('http://localhost:8080/api/judge0/executeAsync/testcase', submissionData)
      .subscribe((response: any) => {
        this.output = response || 'No output received.';
      }, error => {
        this.output = 'Execution Error: ' + error.message;
      });
  }

  // Function to validate code against test cases
  validateTestCases() {
    const testCases = [
      { input: '3 5', expectedOutput: '8\n' }, // Example test case
      { input: '10 20', expectedOutput: '30\n' }
    ];

    const submissionData = {
      submission: {
        sourceCode: this.code,
        languageId: this.selectedLanguage
      },
      testCases: testCases
    };

    this.http.post('http://localhost:8080/api/judge0/evaluateAsync', submissionData)
      .subscribe((response: any) => {
        this.testCaseResult = JSON.stringify(response, null, 2);
      }, error => {
        this.testCaseResult = 'Validation Error: ' + error.message;
      });
  }
}
