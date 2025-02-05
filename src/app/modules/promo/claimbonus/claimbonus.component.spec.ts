import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimbonusComponent } from './claimbonus.component';

describe('ClaimbonusComponent', () => {
  let component: ClaimbonusComponent;
  let fixture: ComponentFixture<ClaimbonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimbonusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimbonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
