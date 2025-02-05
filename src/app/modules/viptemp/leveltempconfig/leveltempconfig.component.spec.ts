import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveltempconfigComponent } from './leveltempconfig.component';

describe('LeveltempconfigComponent', () => {
  let component: LeveltempconfigComponent;
  let fixture: ComponentFixture<LeveltempconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeveltempconfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeveltempconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
