import { Component, OnInit } from '@angular/core';
import { StudentTestService } from 'src/app/services/student-test.service';


@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.css']
})
export class StudentsTestComponent implements OnInit {
  enrolledCourses: any[] = [];
  availableTests: any[] = [];
  selectedTest: any = null;
  answers: { [questionId: string]: string } = {}; // Stores student answers
  rollno!: string;

  constructor(private testService: StudentTestService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      alert('Error fetching student details. Please log in again.');
      return;
    }
    this.rollno = studentId;
    

    this.loadTests();
  }

  loadTests() {
    this.testService.getAvailableTests(this.rollno).subscribe({
      next: (tests) => {
        this.availableTests = tests;
      },
      error: (err) => console.error('Error fetching tests:', err)
    });
  }

  startTest(test: any) {
    const testId = test.id; // Assuming test has a testId
    const testUrl = `/student/coding-test/${testId}`;
    window.open(testUrl, '_blank');
    
  }
  

  submitTest() {
    if (!this.selectedTest) return;

    const submissionData = {
      rollno: this.rollno,
      testId: this.selectedTest.testId,
      answers: this.answers
    };

    this.testService.submitTest(submissionData).subscribe({
      next: () => {
        alert('Test submitted successfully!');
        this.selectedTest = null;
        this.loadTests();
      },
      error: (err) => {
        alert('Error submitting test!');
        console.error(err);
      }
    });
  }
}
