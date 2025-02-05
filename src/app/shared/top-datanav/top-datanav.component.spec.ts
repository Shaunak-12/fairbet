import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDatanavComponent } from './top-datanav.component';

describe('TopDatanavComponent', () => {
  let component: TopDatanavComponent;
  let fixture: ComponentFixture<TopDatanavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDatanavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopDatanavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
