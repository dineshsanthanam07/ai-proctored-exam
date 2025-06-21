import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from 'src/app/services/enrollment.service';


@Component({
  selector: 'app-enrollment-requests',
  templateUrl: './enrollment-requests.component.html',
  styleUrls: ['./enrollment-requests.component.css']
})
export class EnrollmentRequestsComponent implements OnInit {
  pendingEnrollments: any[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadPendingEnrollments();
  }

  /** Load pending enrollments for Admin */
  loadPendingEnrollments() {
    this.enrollmentService.getPendingEnrollments().subscribe({
      next: (enrollments) => {
        this.pendingEnrollments = enrollments;
      },
      error: (err) => console.error('Error fetching enrollments:', err)
    });
  }

  /** Approve Enrollment */
  approveEnrollment(enrollmentId: number) {
    this.enrollmentService.updateEnrollmentStatus(enrollmentId, 'APPROVED').subscribe(() => {
      this.loadPendingEnrollments(); // Refresh list
    });
  }
  
  /** Reject Enrollment */
  rejectEnrollment(enrollmentId: number) {
    this.enrollmentService.updateEnrollmentStatus(enrollmentId, 'REJECTED').subscribe(() => {
      this.loadPendingEnrollments(); // Refresh list
    });
  }
  
}
