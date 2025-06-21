import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BaseLoginComponent } from './login/base-login/base-login.component';
import { LoginComponent } from './super-admin/login/login.component';
import { AdminLoginComponent } from './admin/login/login.component';
import {AdminRegisterComponent} from './admin/register/register.component';
import { StudentLoginComponent } from './student/login/login.component';

import { StudentRegisterComponent } from './student/register/register.component';

const routes: Routes = [
  // Base login selector page
  { path: 'login', component: BaseLoginComponent },

  // Super Admin Routes
  { path: 'super-admin/login', component: LoginComponent },
  
  {
    path: 'super-admin',
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule),
    canActivate: [AuthGuard],data: { roles: ['SUPERADMIN'] }
  },

  // Admin (Faculty) Routes
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/register', component: AdminRegisterComponent },

  // Lazy Load Admin Module (Important)
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  // Student Routes
  { path: 'student/login', component: StudentLoginComponent },
  { path: 'student/register', component: StudentRegisterComponent },
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },


  // Redirect root to base login
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
