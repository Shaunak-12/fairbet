import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormLevComponent } from './add-form-lev.component';

describe('AddFormLevComponent', () => {
  let component: AddFormLevComponent;
  let fixture: ComponentFixture<AddFormLevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormLevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormLevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
