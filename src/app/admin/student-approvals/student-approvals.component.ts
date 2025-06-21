import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-approvals',
  templateUrl: './student-approvals.component.html',
  styleUrls: ['./student-approvals.component.css']
})
export class StudentApprovalsComponent {
  pendingStudents: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPendingStudents();
  }
  searchText: string = '';
  sortColumn: string = '';
  sortAscending: boolean = true;
  
  filteredStudents() {
    return this.pendingStudents
      .filter(student => 
        student.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
        student.rollNo.includes(this.searchText)
      )
      .sort((a, b) => {
        if (!this.sortColumn) return 0;
        return this.sortAscending 
          ? (a[this.sortColumn] > b[this.sortColumn] ? 1 : -1) 
          : (a[this.sortColumn] < b[this.sortColumn] ? 1 : -1);
      });
  }
  
  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }
  }
  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      if (token) {
        return new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });
      }
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
  
  fetchPendingStudents() {
    this.http.get<any[]>('http://localhost:8082/api/student/pending',{ headers: this.getAuthHeaders() })
      .subscribe(response => {
        this.pendingStudents = response;
      }, error => {
        console.error('Error fetching students:', error);
      });
  }

  approveStudent(rollNo: string) {
    this.http.put(`http://localhost:8082/api/student/approve/${rollNo}`, {})
      .subscribe(response => {
        this.pendingStudents = this.pendingStudents.filter(student => student.rollNo !== rollNo);
      }, error => {
        console.error('Approval failed:', error);
      });
  }
}
