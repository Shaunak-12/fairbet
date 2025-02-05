import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminDetailsComponent } from './add-admin-details.component';

describe('AddAdminDetailsComponent', () => {
  let component: AddAdminDetailsComponent;
  let fixture: ComponentFixture<AddAdminDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdminDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
