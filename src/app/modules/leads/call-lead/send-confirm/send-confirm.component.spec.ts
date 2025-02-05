import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendConfirmComponent } from './send-confirm.component';

describe('SendConfirmComponent', () => {
  let component: SendConfirmComponent;
  let fixture: ComponentFixture<SendConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
