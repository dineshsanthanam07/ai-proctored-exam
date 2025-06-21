import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApprovalsComponent } from './student-approvals.component';

describe('StudentApprovalsComponent', () => {
  let component: StudentApprovalsComponent;
  let fixture: ComponentFixture<StudentApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApprovalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
