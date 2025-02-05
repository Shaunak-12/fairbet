import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiInputHeaderComponent } from './multi-input-header.component';

describe('MultiInputHeaderComponent', () => {
  let component: MultiInputHeaderComponent;
  let fixture: ComponentFixture<MultiInputHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiInputHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiInputHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
