import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkLeadComponent } from './bulk-lead.component';

describe('BulkLeadComponent', () => {
  let component: BulkLeadComponent;
  let fixture: ComponentFixture<BulkLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
