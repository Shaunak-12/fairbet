import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcPromotionComponent } from './dc-promotion.component';

describe('DcPromotionComponent', () => {
  let component: DcPromotionComponent;
  let fixture: ComponentFixture<DcPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
