import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CodingTestComponent } from './coding-test/coding-test.component';
import { StudentCourseComponent } from './course/course.component';
import { StudentsTestComponent } from './student-test/student-test.component';

const routes: Routes = [
  {
    path: '',  // No 'student' prefix, it's already handled in app-routing.module.ts
    component: StudentComponent, // Parent with Sidebar
    children: [
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'coding-test', component: CodingTestComponent },
      { path: 'courses', component: StudentCourseComponent },
      { path: 'coding-test', component: CodingTestComponent },
      { path: 'coding-test/:id', component: CodingTestComponent },
      


      {path:'tests',component:StudentsTestComponent},

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default to dashboard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
