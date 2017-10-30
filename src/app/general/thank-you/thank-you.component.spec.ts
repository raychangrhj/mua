import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of';

import { GeneralThankYouComponent } from './thank-you.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';
import { LenderService } from '../../lender/services/lender.service';
import { Observable } from 'rxjs/Observable';

describe('GeneralThankYouComponent', () => {
  let component: GeneralThankYouComponent;
  let fixture: ComponentFixture<GeneralThankYouComponent>;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: LenderService,
          useValue: jasmine.createSpyObj('lenderService', ['getMLO'])
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        GeneralThankYouComponent,
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
    fixture = TestBed.createComponent(GeneralThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
