import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-login',
  templateUrl: './base-login.component.html',
  styleUrls: ['./base-login.component.css']
})
export class BaseLoginComponent {
  constructor(private router: Router) {}

  navigateToLogin(role: string) {
    switch (role) {
      case 'super-admin':
        this.router.navigate(['/super-admin/login']);
        break;
      case 'admin':
        this.router.navigate(['/admin/login']);
        break;
      case 'student':
        this.router.navigate(['/student/login']);
        break;
      default:
        break;
    }
  }
}
