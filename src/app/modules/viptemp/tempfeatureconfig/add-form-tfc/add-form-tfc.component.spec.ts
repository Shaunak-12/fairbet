import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormTfcComponent } from './add-form-tfc.component';

describe('AddFormTfcComponent', () => {
  let component: AddFormTfcComponent;
  let fixture: ComponentFixture<AddFormTfcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormTfcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormTfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
