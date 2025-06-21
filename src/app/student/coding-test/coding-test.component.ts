import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as ace from 'ace-builds';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CodingTestService } from 'src/app/services/coding-test.service';
import { ProctoringService } from 'src/app/services/proctoring.service';
import Peer from 'peerjs';

interface Question {
  id: number;
  title: string;
  description: string;
  language: string;
}

interface Language {
  id: number;
  name: string;
  aceMode: string;
}

@Component({
  selector: 'app-coding-test',
  templateUrl: './coding-test.component.html',
  styleUrls: ['./coding-test.component.css']
})
export class CodingTestComponent implements AfterViewInit {
  code: string = '# Write your code here...';
  selectedLanguage: number = 71; // Default to Python
  customInput: string = '';
  output: string | null = null;
  testId!: number;
  rollno!: string;
  testDetails: any = null;
  timeLeft: number = 0;
  tabSwitchCount: number = 0;
  desktopSwitchCount: number = 0;
  ignoreInitialSwitch = true;
  intervalSubscription: Subscription | null = null;
  questions: Question[] = [];
  peer: any;
  peerId: string = '';
  adminPeerId = 'admin-peer-id'; 
  
  @ViewChild('editor') private editorRef!: ElementRef;
  @ViewChild('videoElement') videoElement!: ElementRef;
  // ✅ Language Mapping
  languages: Language[] = [
    { id: 71, name: 'Python', aceMode: 'python' },
    { id: 63, name: 'JavaScript', aceMode: 'javascript' },
    { id: 62, name: 'Java', aceMode: 'java' },
    { id: 54, name: 'C++', aceMode: 'c_cpp' },
    { id: 50, name: 'C', aceMode: 'c' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private testService: CodingTestService,private proctoringService: ProctoringService) {}

  ngAfterViewInit(): void {

    this.peer = new Peer(); // Create a PeerJS connection

    this.peer.on('open', (id: string) => {
      this.peerId = id;
      console.log('Student Peer ID:', id);
    });

    // Capture the screen and stream to the admin
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      const call = this.peer.call(this.adminPeerId, stream);
      console.log('Streaming screen to admin:', this.adminPeerId);
    }).catch((err) => console.error('Error sharing screen:', err));
  



    this.rollno = localStorage.getItem('studentId') || '';
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    this.proctoringService.initializeProctoring(this.videoElement.nativeElement);
    if (!this.testId || !this.rollno) {
      alert('Invalid test. Redirecting...');
      this.router.navigate(['/student/tests']);
      return;
    }

    this.loadTest();
    this.setupEditor();
    setTimeout(() => (this.ignoreInitialSwitch = false), 2000);
    this.detectDesktopSwitch();
    
  }

  // ✅ Load Test Details & Questions
  loadTest() {
    this.testService.getTestDetails(this.testId).subscribe(
      (response) => {
        this.testDetails = response;
        this.selectedLanguage = response.languageId;
        this.updateEditorMode(this.selectedLanguage);
        this.timeLeft = response.duration * 60; // Convert minutes to seconds
        this.resumeTimer();
      },
      (error) => console.error('Error fetching test details:', error)
    );

    this.testService.getQuestions(this.testId).subscribe(
      (data) => {
        this.questions = data;
      },
      (error) => console.error('Error fetching questions:', error)
    );
  }

  // ✅ Setup Ace Editor
  setupEditor() {
    const editor = ace.edit(this.editorRef.nativeElement);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/python');
    editor.session.on('change', () => (this.code = editor.getValue()));
  }

  // ✅ Resume Timer
  resumeTimer() {
    const storedStartTime = localStorage.getItem(`test_${this.testId}_startTime`);
    const currentTime = Math.floor(Date.now() / 1000);

    if (storedStartTime) {
      this.timeLeft = Math.max(this.timeLeft - (currentTime - parseInt(storedStartTime)), 0);
    } else {
      localStorage.setItem(`test_${this.testId}_startTime`, currentTime.toString());
    }

    this.startTimer();
  }

  // ✅ Start Timer
  startTimer() {
    this.intervalSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.autoSubmitCode();
      }
    });
  }

  // ✅ Execute Code
  executeCode() {
    const requestData = {
      source_code: this.code,
      language_id: this.selectedLanguage,
      customInput: this.customInput.trim() || ''
    };
  
    this.testService.executeCode(requestData).subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        this.output = response || 'No output received.';
      },
      (error) => {
        console.error('Execution error:', error);
        this.output = 'Execution Error: ' + error.message;
      }
    );
  }
  

  // ✅ Auto-submit Code when time is up
  autoSubmitCode() {
    console.log('Time is up! Auto-submitting code...');
    this.submitCode();
    this.intervalSubscription?.unsubscribe();
    localStorage.removeItem(`test_${this.testId}_startTime`);
    this.router.navigate(['/student/tests']);
  }
  sendProctoringWarning(message: string) {
    //alert(message);
    console.warn( {message});
  }

  // ✅ Submit Code to Backend
  submitCode() {
    const submissionData = {
      studentId: localStorage.getItem('studentId'),
      submittedCode: this.code,  // ✅ this matches the DTO
      languageId: this.selectedLanguage,
      testId: this.testId
    };
  
    this.testService.submitCode(submissionData).subscribe(
      () => {
        alert('Code submitted successfully!');
        localStorage.removeItem(`test_${this.testId}_startTime`);
        this.router.navigate(['/student/tests']);
      },
      (error) => {
        console.error('Error submitting code:', error);
      }
    );
  }
  
  
  // ✅ Detect Tab Switch
 

  // ✅ Detect Desktop Switch
  detectDesktopSwitch() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !this.ignoreInitialSwitch) {
        this.desktopSwitchCount++;
        this.sendProctoringWarning('Application switch detected!');
      }
    });
  }

  // ✅ Update Ace Editor Mode
  updateEditorMode(languageId: number) {
    const selectedLang = this.languages.find(lang => lang.id === languageId);
    if (selectedLang) {
      ace.edit(this.editorRef.nativeElement).session.setMode(`ace/mode/${selectedLang.aceMode}`);
    }
  }
}
