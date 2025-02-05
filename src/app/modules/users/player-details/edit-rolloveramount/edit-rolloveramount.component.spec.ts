import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolloveramountComponent } from './edit-rolloveramount.component';

describe('EditRolloveramountComponent', () => {
  let component: EditRolloveramountComponent;
  let fixture: ComponentFixture<EditRolloveramountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRolloveramountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRolloveramountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
