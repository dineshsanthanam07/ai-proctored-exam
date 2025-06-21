import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/admin/login']);
  }
}
