import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterListComponent } from './new-register-list.component';

describe('NewRegisterListComponent', () => {
  let component: NewRegisterListComponent;
  let fixture: ComponentFixture<NewRegisterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRegisterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
