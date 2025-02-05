import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReelComponent } from './add-reel.component';

describe('AddReelComponent', () => {
  let component: AddReelComponent;
  let fixture: ComponentFixture<AddReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
