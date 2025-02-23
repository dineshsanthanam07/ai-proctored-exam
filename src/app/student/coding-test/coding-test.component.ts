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
  code: string = '// Write your code here...';
  customInput: string = '';
  output: string | null = null;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    const editor = ace.edit(this.editorRef.nativeElement);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/javascript');
    editor.session.on('change', () => {
      this.code = editor.getValue();
    });
  }

  submitCode() {
    const submissionData = {
      source_code: this.code,
      language_id: 63, // Language ID for JavaScript in Judge0
      stdin: this.customInput || ''
    };

    this.http.post('http://localhost:2358/submissions?base64_encoded=false&wait=true', submissionData)
      .subscribe((response: any) => {
        this.output = response.stdout || response.stderr || 'Error: No output received.';
      });
  }
}
