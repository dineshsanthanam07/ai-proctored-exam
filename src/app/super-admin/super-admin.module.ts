import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyManagementComponent } from './faculty-management/faculty-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { ExamMonitoringComponent } from './exam-monitoring/exam-monitoring.component';
import { SuperAdminComponent } from './super-admin.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    DashboardComponent,
    FacultyManagementComponent,
    CourseManagementComponent,
    ExamMonitoringComponent,
    SuperAdminComponent,
    LoginComponent,
    AddCourseComponent
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    SuperAdminRoutingModule,
    HttpClientModule,
    
  ]
})
export class SuperAdminModule { }
