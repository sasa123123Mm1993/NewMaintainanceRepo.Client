import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOffMeterReportComponent } from './total-off-meter-report.component';

describe('TotalOffMeterReportComponent', () => {
  let component: TotalOffMeterReportComponent;
  let fixture: ComponentFixture<TotalOffMeterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalOffMeterReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalOffMeterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
