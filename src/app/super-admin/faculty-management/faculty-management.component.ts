import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-faculty-management',
  templateUrl: './faculty-management.component.html',
  styleUrls: ['./faculty-management.component.css']
})
export class FacultyManagementComponent implements OnInit {
  faculties: any[] = [];
  searchQuery: string = '';
  selectedFaculty: any = null; // For editing

  constructor(private facultyService: FacultyService) {}

  ngOnInit(): void {
    this.loadFaculties();
  }

  // 🔄 Load all faculties
  loadFaculties(): void {
    this.facultyService.getAllFaculty().subscribe((data) => {
      this.faculties = data;
    });
  }

  // 🔍 Filter faculty based on search and approval status
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

  // ✅ Approve a faculty
  approveFaculty(facultyId: number): void {
    this.facultyService.approveFaculty(facultyId).subscribe(() => {
      this.loadFaculties();
    });
  }

  // ❌ Delete a faculty
  deleteFaculty(facultyId: number): void {
    this.facultyService.deleteFaculty(facultyId).subscribe(() => {
      this.loadFaculties();
    });
  }

  // ✏️ Edit a faculty
  editFaculty(faculty: any): void {
    this.selectedFaculty = { ...faculty }; // Clone the faculty details for editing
  }

  // 💾 Save edited faculty
  saveEditedFaculty(): void {
    if (this.selectedFaculty) {
      this.facultyService.updateFaculty(this.selectedFaculty.id, this.selectedFaculty).subscribe(() => {
        this.loadFaculties();
        this.selectedFaculty = null; // Reset the form
      });
    }
  }

  // ❌ Cancel editing
  cancelEdit(): void {
    this.selectedFaculty = null;
  }
}
