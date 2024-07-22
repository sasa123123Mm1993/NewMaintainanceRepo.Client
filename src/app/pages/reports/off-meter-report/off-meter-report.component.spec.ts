import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffMeterReportComponent } from './off-meter-report.component';

describe('OffMeterReportComponent', () => {
  let component: OffMeterReportComponent;
  let fixture: ComponentFixture<OffMeterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffMeterReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffMeterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
