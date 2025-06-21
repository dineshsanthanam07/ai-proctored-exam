import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentCourseService } from '../services/student-course.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class StudentLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentCourseService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      roll_no: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { roll_no, password } = this.loginForm.value;

      this.studentService.login(roll_no, password).subscribe({
        next: (response) => {
          // Assuming the API response contains a token and role
          const { token, role, username } = response;
          

          // Store token and role in local storage 
          this.studentService.storeToken(token, role, username);

          // Navigate to the student dashboard
          this.router.navigate(['/student/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid Roll Number or Password!';
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/student/register']);
  }
}
