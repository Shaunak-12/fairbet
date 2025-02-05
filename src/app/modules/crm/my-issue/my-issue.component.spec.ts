import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIssueComponent } from './my-issue.component';

describe('MyIssueComponent', () => {
  let component: MyIssueComponent;
  let fixture: ComponentFixture<MyIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
