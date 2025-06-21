import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  courses: any[] = []; // List of courses assigned to the faculty
  selectedCourseId: number = 0; // Selected course ID

  test = {
    title: '',
    description: '',
    language: '',
    duration: 0,
    courseId: 0 // Added courseId
  };

  testCreated = false;
  testId: number = 0;
  newQuestion = {
    title: '',
    description: '',
    language: ''
  };
  questions: any[] = [];
  facultyId: number | null = null;
  userId: number | null = null;

  private baseUrl = 'http://localhost:8082/api'; // Base API URL

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    
    if (!this.userId) {
      console.error("User ID is missing! Please check localStorage.");
      return;
    }

    // 🔹 Fetch Faculty ID & Assigned Courses
    this.getFacultyId(this.userId).subscribe(
      facultyId => {
        this.facultyId = facultyId;
        localStorage.setItem('facultyId', facultyId.toString());
        console.log("✅ Faculty ID Retrieved:", this.facultyId);
        this.loadCourses(); // Fetch assigned courses
      },
      error => console.error("❌ Error fetching Faculty ID:", error)
    );
  }

  // ✅ Fetch Faculty ID
  getFacultyId(userId: number) {
    return this.http.get<number>(`${this.baseUrl}/admin/courses/faculty-id/${userId}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Load courses assigned to the faculty
  loadCourses() {
    if (!this.facultyId) {
      console.error("❌ Faculty ID is missing!");
      return;
    }

    this.http.get<any[]>(`${this.baseUrl}/admin/courses/assigned?facultyId=${this.facultyId}`, { headers: this.getAuthHeaders() })
      .subscribe(
        response => {
          this.courses = response;
          console.log("✅ Assigned Courses:", this.courses);
        },
        error => console.error('❌ Error loading courses:', error)
      );
  }

  // 📌 Get Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    });
  }

  // ✅ Create Test
 // ✅ Create Test with Correct JSON Format
createTest() {
  if (!this.selectedCourseId) {
    alert('⚠️ Please select a course.');
    return;
  }

  // Ensure the test JSON matches the required structure
  const requestBody = {
    title: this.test.title,
    description: this.test.description,
    duration: this.test.duration,
    course: {
      id: this.selectedCourseId // Ensure this is inside the "course" object
    }
  };

  this.http.post<any>(`${this.baseUrl}/tests/create`, requestBody, { headers: this.getAuthHeaders() })
    .subscribe(
      response => {
        this.testCreated = true;
        this.testId = response.id;
        alert('✅ Test created successfully! Now add questions.');
        console.log('Test Created:', response);
      },
      error => {
        console.error('❌ Error creating test:', error);
        alert('❌ Error creating test. Please try again.');
      }
    );
}


  // ✅ Add Question
  addQuestion() {
    if (!this.newQuestion.title || !this.newQuestion.description) {
      alert('⚠️ Question title and description are required!');
      return;
    }

    this.http.post(`${this.baseUrl}/tests/questions/add/${this.testId}`, this.newQuestion, { headers: this.getAuthHeaders() })
      .subscribe(
        response => {
          console.log('✅ Question submitted:', response);
          alert('✅ Question added successfully!');
          this.questions.push({ ...this.newQuestion });
        },
        error => {
          console.error('❌ Error submitting question:', error);
          alert('❌ Error adding question. Please try again.');
        }
      );

    this.newQuestion = { title: '', description: '', language: '' }; // Reset input fields
  }

  // 🔄 Reset Form
  resetForm() {
    this.test = { title: '', description: '', language: '', duration: 0, courseId: 0 };
    this.selectedCourseId = 0;
    this.testCreated = false;
    this.testId = 0;
    this.questions = [];
  }
}
