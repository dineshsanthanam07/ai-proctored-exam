import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course, Faculty } from 'src/app/models/course.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  newCourse: Course = { courseId: '', name: '', facultyId: 0 };
  faculties: Faculty[] = [];

  constructor(private courseService: CourseService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadFaculties();
  }

  // 🔄 Load Faculty List
  loadFaculties(): void {
    this.courseService.getAllFaculties().subscribe({
      next: (data) => this.faculties = data,
      error: (err) => this.showNotification('❌ Failed to load faculties!', 'Close')
    });
  }

  // ➕ Add New Course
  addCourse(): void {
    if (!this.newCourse.facultyId || !this.newCourse.name || !this.newCourse.courseId) {
      this.showNotification('⚠️ Please fill in all fields before submitting!', 'Close');
      return;
    }

    this.courseService.addCourse(this.newCourse).subscribe({
      next: () => {
        this.showNotification('✅ Course added successfully!', 'Close');
        this.newCourse = { courseId: '', name: '', facultyId: 0 }; // Reset form
      },
      error: () => this.showNotification('❌ Failed to add course!', 'Close')
    });
  }

  // 🎉 Show Notification
  private showNotification(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
