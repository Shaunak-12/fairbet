import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceTablePaginatorComponent } from './advance-table-paginator.component';

describe('AdvanceTablePaginatorComponent', () => {
  let component: AdvanceTablePaginatorComponent;
  let fixture: ComponentFixture<AdvanceTablePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceTablePaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceTablePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
