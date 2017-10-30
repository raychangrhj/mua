import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { GeneralOutOfNetworkComponent } from './out-of-network.component';
import { ActionBtnGroupComponent } from '../../shared/action-btn-group/action-btn-group.component';

describe('GeneralOutOfNetworkComponent', () => {
  let component: GeneralOutOfNetworkComponent;
  let fixture: ComponentFixture<GeneralOutOfNetworkComponent>;
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
            data: jasmine.createSpyObj('activatedRoute.data', ['map']),
          }
        }
      ],
      declarations: [
        GeneralOutOfNetworkComponent,
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
    fixture = TestBed.createComponent(GeneralOutOfNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
