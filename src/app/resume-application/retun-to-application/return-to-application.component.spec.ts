import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ReturnToApplicationComponent } from './return-to-application.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';

describe('ReturnToApplicationComponent', () => {
  let component: ReturnToApplicationComponent;
  let fixture: ComponentFixture<ReturnToApplicationComponent>;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map'])
          }
        }
      ],
      declarations: [
        ReturnToApplicationComponent,
        ActionBtnGroupComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([ActivatedRoute], (_activatedRoute_) => {
    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ continueLink: true })) {
        return Observable.of('/continue-link');
      }

      if (filter({ saveAction: true })) {
        return Observable.of(null);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML integration tests', () => {
    it('should have a link for returning to the application', () => {
      const returnLink = fixture.debugElement.query(By.css('a.btn.btn-continue'));
      expect(returnLink.attributes['routerLink']).toEqual('/welcome');
    });
  });
});
