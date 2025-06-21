import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Import your auth service

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminName: string = 'Admin';
  adminDepartment: string = '';
  adminDesignation: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Fetch Admin Details
    // this.authService.getAdminDetails().subscribe((admin) => {
    //   this.adminName = admin.name;
    //   this.adminDepartment = admin.department;
    //   this.adminDesignation = admin.designation;
    // // });
  }

  logout() {
    localStorage.clear(); // Clear all stored data
    this.router.navigate(['/admin/login']); // Redirect to Admin Login
  }
}
