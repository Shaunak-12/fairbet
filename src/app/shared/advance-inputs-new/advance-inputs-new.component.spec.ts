import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceInputsNewComponent } from './advance-inputs-new.component';

describe('AdvanceInputsNewComponent', () => {
  let component: AdvanceInputsNewComponent;
  let fixture: ComponentFixture<AdvanceInputsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceInputsNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceInputsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
