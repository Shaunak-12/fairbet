import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSmsComponent } from './update-sms.component';

describe('UpdateSmsComponent', () => {
  let component: UpdateSmsComponent;
  let fixture: ComponentFixture<UpdateSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
