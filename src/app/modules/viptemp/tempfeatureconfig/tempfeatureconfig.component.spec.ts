import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempfeatureconfigComponent } from './tempfeatureconfig.component';

describe('TempfeatureconfigComponent', () => {
  let component: TempfeatureconfigComponent;
  let fixture: ComponentFixture<TempfeatureconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempfeatureconfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempfeatureconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
