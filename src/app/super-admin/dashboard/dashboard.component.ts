import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/services/superadmin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalFaculty: number = 0;
  totalStudents: number = 0;
  pendingappovals:number=0;
  totalCourses: number = 0;
  ongoingExams: number = 0;

  constructor(private superAdminService: SuperAdminService) {} 

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.superAdminService.getDashboardData().subscribe(
      (data) => {
        this.totalFaculty = data.totalFaculty;
        this.totalCourses = data.totalCourses;
        if(data.pendingappovals>0)
        {this.pendingappovals=data.pendingappovals;}
        

        // Uncomment below if your backend includes these fields
        // this.totalStudents = data.totalStudents;
        // this.ongoingExams = data.ongoingExams;
      },
      (error) => console.error('Error fetching dashboard data:', error)
    );
  }
}
