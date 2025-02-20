import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './super-admin/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Ensure login route exists
  { path: 'super-admin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule), canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirect root to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
