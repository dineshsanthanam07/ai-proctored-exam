import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './login/login.component';
import { AdminRegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentApprovalsComponent } from './student-approvals/student-approvals.component';
import { EnrollmentRequestsComponent } from './enrollment-requests/enrollment-requests.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { ExamMonitoringComponent } from './exam-monitoring/exam-monitoring.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';
import { MalpracticeReportsComponent } from './malpractice-reports/malpractice-reports.component';

import { SubmissionDetailsComponent } from './submission-details/submission-details.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminDashboardComponent,
    AdminComponent,
    CoursesComponent,
    StudentApprovalsComponent,
    EnrollmentRequestsComponent,
   
    ExamMonitoringComponent,
    ExamResultsComponent,
    MalpracticeReportsComponent,
    CreateTestComponent,
  
    SubmissionDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
