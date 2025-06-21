import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class AdminRegisterComponent {
  registerForm: FormGroup;
  registrationSuccess = false;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.adminService.registerFaculty(this.registerForm.value).subscribe(
        () => {
          this.registrationSuccess = true;
          this.registerForm.reset();
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}