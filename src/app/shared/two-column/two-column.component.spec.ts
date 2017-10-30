import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TwoColumnComponent } from './two-column.component';

describe('TwoColumnComponent', () => {
  let component: TwoColumnComponent;
  let fixture: ComponentFixture<TwoColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwoColumnComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML integration specs', () => {
    it('should include two named router-outlets', () => {
      const contentOutlet = fixture.debugElement.query(By.css('router-outlet[name="content"]'));
      expect(contentOutlet).toBeTruthy();

      const asideOutlet = fixture.debugElement.query(By.css('router-outlet[name="aside"]'));
      expect(asideOutlet).toBeTruthy();
    });
  });
});
