import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  assignedCourses: any[] = [];
  selectedCourse: any = null;
  students: any[] = [];
  facultyId: number | null = null;
  userId: number | null = null;
  private apiUrl = 'http://localhost:8082/api/admin/courses/faculty-id';
   // Retrieve faculty ID from localStorage

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    }
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));

    if (!this.userId) {
      console.error("User ID is null or undefined! Check localStorage.");
      return;
    }

    this.getFacultyId(this.userId).subscribe(
      (facultyId) => {
        this.facultyId = facultyId;
        localStorage.setItem('facultyId', facultyId.toString()); // Store in localStorage
        console.log("Faculty ID:", this.facultyId);
        this.loadAssignedCourses(); // Load courses after getting faculty ID
      },
      (error) => {
        console.error("Error fetching Faculty ID:", error);
      }
    );
  }getFacultyId(userId: number) {
    return this.http.get<number>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Fetch assigned courses for the admin (faculty)
  loadAssignedCourses() {
    this.http.get<any[]>(`http://localhost:8082/api/admin/courses/assigned?facultyId=${this.facultyId}`, { headers: this.getAuthHeaders() })
      .subscribe(
        data => {
          console.log("Fetched Assigned Courses:", data); // ✅ Print courses to verify response
          this.assignedCourses = data;
        },
        error => console.error('Error fetching courses:', error)
      );
  }

  // ✅ Fetch enrolled students for a course and open modal
  openStudentModal(course: any) {
    this.selectedCourse = course;
    this.http.get<any[]>(`http://localhost:8082/api/admin/courses/${course.id}/students`, { headers: this.getAuthHeaders() })
      .subscribe(
        data => {
          console.log(`Students in Course ${course.id}:`, data); // ✅ Print student details
          this.students = data;
          const modalElement = document.getElementById('studentModal');
          if (modalElement) {
            let modal = new bootstrap.Modal(modalElement);
            modal.show();
          }
        },
        error => console.error('Error fetching students:', error)
      );
  }

  viewTests(course: any) {
    alert(`Viewing tests for ${course.name}`);
  }
}
