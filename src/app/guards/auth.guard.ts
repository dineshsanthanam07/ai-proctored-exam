import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Get user role

    if (!token || !role) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Restrict access based on role
    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && !allowedRoles.includes(role)) {
      alert('Unauthorized Access!');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
