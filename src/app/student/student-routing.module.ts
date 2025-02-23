import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodingTestComponent } from './coding-test/coding-test.component';
const routes: Routes = [
  {
    path: '',
    component: CodingTestComponent,
    children: [
      { path: 'coding-test', component: CodingTestComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
