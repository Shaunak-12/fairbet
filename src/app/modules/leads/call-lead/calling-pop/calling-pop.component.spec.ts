import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingPopComponent } from './calling-pop.component';

describe('CallingPopComponent', () => {
  let component: CallingPopComponent;
  let fixture: ComponentFixture<CallingPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallingPopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallingPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
