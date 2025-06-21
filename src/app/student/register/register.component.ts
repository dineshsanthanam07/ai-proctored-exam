import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  studentForm!: FormGroup;
  errorMessage: any;


  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      rollNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      department: ['', Validators.required],
      branch: ['', Validators.required],
      batch: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      delete studentData.confirmPassword; // Remove confirmPassword before sending data

      this.studentService.registerStudent(studentData).subscribe({
        next: (response) => {
          alert('Registration Successful!');
          this.router.navigate(['/student/login']);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Registration failed';
          console.error('Registration Error:', error);
        }
      });
    }
  }
}
