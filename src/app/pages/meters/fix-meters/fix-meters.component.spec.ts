import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixMetersComponent } from './fix-meters.component';

describe('FixMetersComponent', () => {
  let component: FixMetersComponent;
  let fixture: ComponentFixture<FixMetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixMetersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FixMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
