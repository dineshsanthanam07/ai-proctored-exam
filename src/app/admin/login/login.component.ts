import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  private apiUrl = 'http://localhost:8082/api/auth/login'; // Adjust if needed

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // 🔑 Handle form submission and authenticate with backend
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.http.post<any>(this.apiUrl, { username, password }).subscribe(
        (response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token); // Store JWT token
            localStorage.setItem('role', response.role);
            localStorage.setItem('userId',response.id) // Store user role

            console.log('Login successful');
            this.router.navigate(['/admin/dashboard']); // Navigate to dashboard
          }
        },
        (error) => {
          alert('Invalid credentials. Please try again.');
          console.error('Login error:', error);
        }
      );
    }
  }

  // 🚀 Navigate to the registration page
  navigateToRegister(): void {
    this.router.navigate(['/admin/register']);
  }
}
