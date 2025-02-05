import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlevtempconfComponent } from './editlevtempconf.component';

describe('EditlevtempconfComponent', () => {
  let component: EditlevtempconfComponent;
  let fixture: ComponentFixture<EditlevtempconfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditlevtempconfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditlevtempconfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
