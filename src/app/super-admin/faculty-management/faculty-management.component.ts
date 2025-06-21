import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-faculty-management',
  templateUrl: './faculty-management.component.html',
  styleUrls: ['./faculty-management.component.css']
})
export class FacultyManagementComponent implements OnInit {
  faculties: any[] = [];
  searchQuery: string = '';

  constructor(private facultyService: FacultyService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadFaculties();
  }

  // 🔄 Load all faculty members from backend
  loadFaculties(): void {
    this.facultyService.getAllFaculty().subscribe(
      (data) => {
        this.faculties = data;
      },
      (error) => {
        this.showNotification('⚠ Error fetching faculty data!', true);
      }
    );
  }

  // 🔍 Filter and sort faculty list (Pending approvals on top)
  filteredFaculties(): any[] {
    return this.faculties
      .filter((faculty) => {
        const query = this.searchQuery.toLowerCase();
        return (
          faculty.name.toLowerCase().includes(query) ||
          faculty.username.toLowerCase().includes(query) ||
          faculty.department.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (a.status === 'PENDING_APPROVAL' && b.status !== 'PENDING_APPROVAL') return -1;
        if (a.status !== 'PENDING_APPROVAL' && b.status === 'PENDING_APPROVAL') return 1;
        return 0;
      });
  }

  // ✅ Approve faculty and refresh list
  approveFaculty(facultyId: number): void {
    this.facultyService.approveFaculty(facultyId).subscribe(
      (response) => {
        this.loadFaculties();
        this.showNotification(response.message || '✅ Faculty approved successfully!');
      },
      (error) => {
        this.showNotification('⚠ Failed to approve faculty!', true);
      }
    );
  }

  // ❌ Delete faculty and refresh list
  deleteFaculty(facultyId: number): void {
    this.facultyService.deleteFaculty(facultyId).subscribe(
      (response) => {
        this.loadFaculties();
        this.showNotification(response.message || '❌ Faculty deleted successfully!');
      },
      (error) => {
        this.showNotification('⚠ Failed to delete faculty!', true);
      }
    );
  }

  // 🎉 Show a snackbar notification
  private showNotification(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: isError ? 'error-snackbar' : 'success-snackbar',
    });
  }
}
