import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdepopromoComponent } from './newdepopromo.component';

describe('NewdepopromoComponent', () => {
  let component: NewdepopromoComponent;
  let fixture: ComponentFixture<NewdepopromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewdepopromoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewdepopromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
