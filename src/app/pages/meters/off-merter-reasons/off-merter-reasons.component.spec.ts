import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffMerterReasonsComponent } from './off-merter-reasons.component';

describe('OffMerterReasonsComponent', () => {
  let component: OffMerterReasonsComponent;
  let fixture: ComponentFixture<OffMerterReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffMerterReasonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffMerterReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
