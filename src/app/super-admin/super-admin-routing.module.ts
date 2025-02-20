import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { ExamMonitoringComponent } from './exam-monitoring/exam-monitoring.component';
import { FacultyManagementComponent } from './faculty-management/faculty-management.component';
import { SuperAdminComponent } from './super-admin.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'faculty-management', component: FacultyManagementComponent },
      { path: 'course-management', component: CourseManagementComponent },
      { path: 'exam-monitoring', component: ExamMonitoringComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
