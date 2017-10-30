import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { GeneralPatriotActComponent } from './patriot-act.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';

describe('GeneralPatriotActComponent', () => {
  let component: GeneralPatriotActComponent;
  let fixture: ComponentFixture<GeneralPatriotActComponent>;
  let activatedRoute;
  let isCoBorrowerPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        GeneralPatriotActComponent,
        ActionBtnGroupComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([ActivatedRoute], (_activatedRoute_) => {
    isCoBorrowerPage = true;

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ continueLink: true })) {
        return Observable.of('/continue-link');
      }
      if (filter({ isCoBorrowerPage: true })) {
        return Observable.of(isCoBorrowerPage);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPatriotActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
