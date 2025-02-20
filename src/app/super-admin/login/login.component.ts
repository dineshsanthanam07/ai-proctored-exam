import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      alert('Username and password are required!');
      return;
    }

    this.loading = true; // Show loading animation

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.loading = false; // Stop loading after 2 sec
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/super-admin/dashboard']); // Navigate after successful login
        }, 2000);
      },
      error: () => {
        setTimeout(() => {
          this.loading = false; // Stop loading after 2 sec
          alert('Invalid credentials!'); // Show error message after delay
        }, 2000);
      }
    });
  }
}
