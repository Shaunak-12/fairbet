import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLanguageComponent } from './multi-language.component';

describe('MultiLanguageComponent', () => {
  let component: MultiLanguageComponent;
  let fixture: ComponentFixture<MultiLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
