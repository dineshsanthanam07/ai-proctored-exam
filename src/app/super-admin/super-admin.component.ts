import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {
constructor(private router: Router) {}
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.router.navigate(['/login']).then(() => {
    window.location.reload();  // Force reload to clear any cached state
  });
}


}
