import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceTitleHeadNewComponent } from './advance-title-head-new.component';

describe('AdvanceTitleHeadNewComponent', () => {
  let component: AdvanceTitleHeadNewComponent;
  let fixture: ComponentFixture<AdvanceTitleHeadNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceTitleHeadNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceTitleHeadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
