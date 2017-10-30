import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  combineReducers,
  Store,
  StoreModule
} from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { QuestionsExistingCustomerConfirmAddressComponent } from './confirm-address.component';
import { ActionBtnGroupComponent } from '../../../../shared/action-btn-group/action-btn-group.component';
import { AddressState } from '../../shared/ngrx/reducers/address/address.reducer';
import { AddressUpdateAction } from '../../shared/ngrx/actions/address/address.action';
import { reducers } from '../../shared/ngrx/reducers/index.reducer';
import { QuestionsProgressPillsComponent } from '../../../shared/progress-pills/progress-pills.component';
import {
  initialNavigationState,
  reducer
} from '../../../shared/ngrx/reducers/navigation.reducer';
import { AccessibleAttributesDirective } from '../../../../shared/inputs/accessible-attributes.directive';
import { InputGroupDirective } from '../../../../shared/inputs/input-group.directive';

describe('QuestionsExistingCustomerConfirmAddressComponent', () => {
  let component: QuestionsExistingCustomerConfirmAddressComponent;
  let fixture: ComponentFixture<QuestionsExistingCustomerConfirmAddressComponent>;
  let activatedRoute;
  let router;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          navigation: reducer,
          customer: combineReducers(reducers)
        })
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
        QuestionsExistingCustomerConfirmAddressComponent,
        ActionBtnGroupComponent,
        AccessibleAttributesDirective,
        InputGroupDirective,
        QuestionsProgressPillsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Store, Router, ActivatedRoute], (_store_, _router_, _activatedRoute_) => {
    store = _store_;

    router = _router_;
    spyOn(router, 'navigate');

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        return Observable.of({
          cancel: {
            text: 'No',
            link: {
              routerLink: '/existing-customer/address'
            }
          },
          save: 'Yes',
          saveAndExit: true
        });
      }
      if (filter({saveAction: true})) {
        return Observable.of(['/foo']);
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsExistingCustomerConfirmAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should extend the QuestionsBaseComponent calling super(...)', () => {
    expect(component.pillsTitle$).toBeDefined();
    expect(component.pills$).toBeDefined();
    expect(component.actionBtnLinkOptions$).toBeDefined();
    expect(component.ngOnInit).toBeDefined();
    expect(component.onSubmit).toBeDefined();
  });

  it('should expose the address from the data store', () => {
    const address: AddressState = {
      street: 'street',
      city: 'city',
      state: 'state',
      zip: 'zip'
    };
    store.dispatch(new AddressUpdateAction(address));
    component.ngOnInit();

    expect(component.address).toEqual(address)
  });

  describe('HTML integration tests', () => {
    let address: AddressState;
    beforeEach(() => {
      address = {
        street: 'street',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      store.dispatch(new AddressUpdateAction(address));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should display the address from the store for user review', () => {
      const addressElem = fixture.debugElement.query(By.css('.address'));
      expect(addressElem.nativeElement.textContent).toContain(address.street);
      expect(addressElem.nativeElement.textContent).toContain(address.city);
      expect(addressElem.nativeElement.textContent).toContain(address.state);
      expect(addressElem.nativeElement.textContent).toContain(address.zip);
    });

    it('should display the progress pills and pills title', () => {
      const progressPillsComponent = fixture.debugElement.query(By.css('regions-progress-pills'));

      let result: any = progressPillsComponent.queryAll(By.css('.pill')).length;
      expect(result).toEqual(initialNavigationState.sections.filter(section => section.required).length);

      result = progressPillsComponent.query(By.css('.section-title')).nativeElement.textContent;
      expect(result).toEqual(initialNavigationState.sections[0].title);
    });
  });
});
