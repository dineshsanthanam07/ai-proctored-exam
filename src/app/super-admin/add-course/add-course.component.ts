import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course, Faculty } from 'src/app/models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  newCourse: Course = { courseId: '', name: '', facultyId: 0 };
  faculties: Faculty[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadFaculties();
  }

  loadFaculties(): void {
    this.courseService.getAllFaculties().subscribe((data) => {
      this.faculties = data;
    });
  }

  addCourse(): void {
    if (this.newCourse.facultyId && this.newCourse.name && this.newCourse.courseId) {
      this.courseService.addCourse(this.newCourse).subscribe(() => {
        alert('Course added successfully!');
        this.newCourse = { courseId: '', name: '', facultyId: 0 };
      });
    }
  }
}
