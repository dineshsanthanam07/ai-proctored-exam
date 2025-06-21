import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { EnrollmentRequestsComponent } from './enrollment-requests/enrollment-requests.component';
import { ExamMonitoringComponent } from './exam-monitoring/exam-monitoring.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';
import { MalpracticeReportsComponent } from './malpractice-reports/malpractice-reports.component';
import { StudentApprovalsComponent } from './student-approvals/student-approvals.component';
import { SubmissionDetailsComponent } from './submission-details/submission-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, // Parent wrapper (Contains Sidebar & Navbar)
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'student-approvals', component: StudentApprovalsComponent },
      { path: 'enrollment-requests', component: EnrollmentRequestsComponent },
      { path: 'create-exam', component: CreateTestComponent },
      { path: 'exam-monitoring', component: ExamMonitoringComponent },
      { path: 'results', component: ExamResultsComponent },
      { path: 'malpractice-reports', component: MalpracticeReportsComponent },
      { path: 'submission-details/:submissionId/:studentId', component: SubmissionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
