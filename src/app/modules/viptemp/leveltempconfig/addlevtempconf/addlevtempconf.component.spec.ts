import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlevtempconfComponent } from './addlevtempconf.component';

describe('AddlevtempconfComponent', () => {
  let component: AddlevtempconfComponent;
  let fixture: ComponentFixture<AddlevtempconfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddlevtempconfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlevtempconfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
