import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalpracticeReportsComponent } from './malpractice-reports.component';

describe('MalpracticeReportsComponent', () => {
  let component: MalpracticeReportsComponent;
  let fixture: ComponentFixture<MalpracticeReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MalpracticeReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MalpracticeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
