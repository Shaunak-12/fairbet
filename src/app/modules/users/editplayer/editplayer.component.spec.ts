import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplayerComponent } from './editplayer.component';

describe('EditplayerComponent', () => {
  let component: EditplayerComponent;
  let fixture: ComponentFixture<EditplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditplayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
