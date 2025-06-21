import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { CodingTestComponent } from './coding-test/coding-test.component';
import { StudentRegisterComponent } from './register/register.component';
import { StudentLoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentComponent } from './student.component';
import { StudentCourseComponent } from './course/course.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentsTestComponent } from './student-test/student-test.component';
@NgModule({
  declarations: [
    CodingTestComponent,
    StudentLoginComponent,
    StudentRegisterComponent,
    StudentDashboardComponent,
    StudentComponent,
    StudentCourseComponent,
    StudentsTestComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,ReactiveFormsModule,HttpClientModule
  ]
})
export class StudentModule { }
