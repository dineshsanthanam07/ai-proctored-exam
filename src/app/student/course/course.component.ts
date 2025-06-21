import { Component, OnInit } from '@angular/core';
import { StudentCourseService } from '../services/student-course.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class StudentCourseComponent implements OnInit {
  availableCourses: any[] = [];
  enrolledCourses: any[] = [];
  rollno: string = ''; // ✅ Ensure rollno is a valid string

  constructor(private courseService: StudentCourseService) {}

  ngOnInit(): void {
    const studentId = localStorage.getItem('studentId');
    
    if (!studentId) {
      alert('Error fetching student details. Please log in again.');
      return;
    }

    this.rollno = studentId; // ✅ Ensure rollno is set
    this.loadCourses();
  }

  loadCourses() {
    // Fetch Available Courses
    this.courseService.getAvailableCourses().subscribe({
      next: (courses) => {
        this.availableCourses = courses.map((course: { courseId: any; name: any }) => ({
          courseId: course.courseId,
          name: course.name
        }));
        
        console.log("Available Courses (Before Filtering):", this.availableCourses); // Debugging
      },
      error: (err) => console.error('Error fetching courses:', err)
    });
  
    // Fetch Enrolled Courses with Status
    this.courseService.getEnrolledCourses(this.rollno).subscribe({
      next: (courses) => {
        console.log("Fetched Enrolled Courses:", courses); // Debugging
  
        this.enrolledCourses = courses.map((course: { courseId: any; name: any; status: any }) => ({
          courseId: course.courseId,
          name: course.name,
          status: course.status?.trim() // Trim spaces
        }));
  
        console.log("Processed Enrolled Courses:", this.enrolledCourses);
  
        // Filter out enrolled courses from available courses
        this.availableCourses = this.availableCourses.filter(course =>
          !this.enrolledCourses.some(enrolled => enrolled.courseId === course.courseId)
        );
  
        console.log("Available Courses (After Filtering):", this.availableCourses); // Debugging
      },
      error: (err) => console.error('Error fetching enrolled courses:', err)
    });
  }
  

  enroll(courseId: string) {
    this.courseService.enrollCourse(this.rollno, courseId).subscribe({
      next: () => {
        alert('Enrollment request submitted successfully.');
        this.loadCourses(); // ✅ Refresh course list
      },
      error: (err) => {
        alert(err.error || 'Enrollment failed!');
        console.error('Error enrolling:', err);
      }
    });
  }
}
