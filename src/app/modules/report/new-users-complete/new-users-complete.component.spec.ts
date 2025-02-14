import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersCompleteComponent } from './new-users-complete.component';

describe('NewUsersCompleteComponent', () => {
  let component: NewUsersCompleteComponent;
  let fixture: ComponentFixture<NewUsersCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUsersCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUsersCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
