import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinwheelComponent } from './spinwheel.component';

describe('SpinwheelComponent', () => {
  let component: SpinwheelComponent;
  let fixture: ComponentFixture<SpinwheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinwheelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinwheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
