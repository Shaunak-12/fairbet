import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormTempComponent } from './add-form-temp.component';

describe('AddFormTempComponent', () => {
  let component: AddFormTempComponent;
  let fixture: ComponentFixture<AddFormTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormTempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
