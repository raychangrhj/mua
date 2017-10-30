import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsProgressPillsComponent } from './progress-pills.component';

describe('QuestionsProgressPillsComponent', () => {
  let component: QuestionsProgressPillsComponent;
  let fixture: ComponentFixture<QuestionsProgressPillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsProgressPillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsProgressPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
