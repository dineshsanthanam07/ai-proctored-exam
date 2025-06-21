import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMonitoringComponent } from './exam-monitoring.component';

describe('ExamMonitoringComponent', () => {
  let component: ExamMonitoringComponent;
  let fixture: ComponentFixture<ExamMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
