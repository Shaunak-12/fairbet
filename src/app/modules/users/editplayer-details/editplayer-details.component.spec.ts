import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplayerDetailsComponent } from './editplayer-details.component';

describe('EditplayerDetailsComponent', () => {
  let component: EditplayerDetailsComponent;
  let fixture: ComponentFixture<EditplayerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditplayerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditplayerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
