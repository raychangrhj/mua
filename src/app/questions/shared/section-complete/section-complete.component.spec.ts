import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCompleteComponent } from './section-complete.component';

describe('SectionCompleteComponent', () => {
  let component: SectionCompleteComponent;
  let fixture: ComponentFixture<SectionCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
