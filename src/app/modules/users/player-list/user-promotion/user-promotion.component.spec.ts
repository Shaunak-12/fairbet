import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromotionComponent } from './user-promotion.component';

describe('UserPromotionComponent', () => {
  let component: UserPromotionComponent;
  let fixture: ComponentFixture<UserPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
