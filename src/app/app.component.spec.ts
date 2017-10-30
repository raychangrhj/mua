import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LenderService } from './lender/services/lender.service';
import { ConfigService } from './config/services/config.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LenderService,
          useValue: jasmine.createSpyObj('LenderService', ['getMLO'])
        },
        {
          provide: ConfigService,
          useValue: jasmine.createSpyObj('ConfigService', ['getConfig'])
        }
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML integration tests', () => {
    it('should include the regions-header component', () => {
      const regionsHeader = fixture.debugElement.query(By.css('regions-header'));
      expect(regionsHeader).toBeTruthy();
    });

    it('should include the regions-footer component', () => {
      const regionsFooter = fixture.debugElement.query(By.css('regions-footer'));
      expect(regionsFooter).toBeTruthy();
    });

    it('should include a router-outlet component', () => {
      const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
      expect(routerOutlet).toBeTruthy();
    });
  });
});
