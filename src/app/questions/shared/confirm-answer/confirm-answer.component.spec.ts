import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { QuestionsConfirmAnswerComponent } from './confirm-answer.component';
import { AddressState } from '../../customer/shared/ngrx/reducers/address/address.reducer';
import { PropertyLocationState } from '../../mortgage-intent/shared/ngrx/reducers/property-location/property-location.reducer';
import { NameState } from '../../customer/shared/ngrx/reducers/name/name.reducer';
import {
  EthnicityState,
  RaceState,
  SexState
} from '../../required-questions/ngrx/reducers/government-questions.reducer';
import { PhoneState } from '../../customer/shared/ngrx/reducers/phone/phone.reducer';

@Component({
  selector: 'regions-test-component-wrapper',
  template: `
    <regions-confirm-answer
      [title]="parentTitle"
      [response]="parentResponse"
      [link]="parentRouterLink"
      [edit]="parentEdit"
      [type]="parentType"
    ></regions-confirm-answer>
  `
})
class TestComponentWrapperComponent {
  public parentTitle: string;
  public parentResponse: string
    | number
    | boolean
    | EthnicityState
    | RaceState
    | SexState
    | AddressState
    | PropertyLocationState
    | NameState
    | PhoneState;
  public parentEdit: string;
  public parentRouterLink: string | string[];
  public parentType: string;
}

describe('QuestionsConfirmAnswerComponent', () => {
  let parentComponent: TestComponentWrapperComponent;
  let component: QuestionsConfirmAnswerComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TestComponentWrapperComponent,
        QuestionsConfirmAnswerComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    parentComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should map the input for title', () => {
    parentComponent.parentTitle = 'Random Title';
    fixture.detectChanges();

    expect(component.title).toEqual('Random Title');
  });

  it('should map the input for response with type null (string)', () => {
    parentComponent.parentResponse = 'Random Response';
    parentComponent.parentType = null;
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Random Response');
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseName).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "address"', () => {
    parentComponent.parentResponse = {
      street: 'street',
      unit: 'unit',
      city: 'city',
      state: 'state',
      zip: 'zip'
    };
    parentComponent.parentType = 'address';
    fixture.detectChanges();

    expect(component.responseAddress).toEqual({
      street: 'street',
      unit: 'unit',
      city: 'city',
      state: 'state',
      zip: 'zip'
    });
    expect(component.responseStr).toBeFalsy();
    expect(component.responseName).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "propertyLocation"', () => {
    parentComponent.parentResponse = {
      street: 'street',
      unit: 'unit',
      city: 'city',
      state: 'state',
      zip: 'zip'
    };
    parentComponent.parentType = 'propertyLocation';
    fixture.detectChanges();

    expect(component.responseAddress).toEqual({
      street: 'street',
      unit: 'unit',
      city: 'city',
      state: 'state',
      zip: 'zip'
    });
    expect(component.responseStr).toBeFalsy();
    expect(component.responseName).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "currency"', () => {
    parentComponent.parentResponse = 100000;
    parentComponent.parentType = 'currency';
    fixture.detectChanges();

    expect(component.responseCurrency).toEqual(100000);
    expect(component.responseStr).toBeFalsy();
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
  });

  it('should map the input for response with type "name"', () => {
    parentComponent.parentResponse = {
      first: 'first',
      last: 'last'
    };
    parentComponent.parentType = 'name';
    fixture.detectChanges();

    expect(component.responseName).toEqual({
      first: 'first',
      last: 'last'
    });
    expect(component.responseStr).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "phone"', () => {
    parentComponent.parentResponse = {
      type: 'mobile',
      number: '(555) 555-5555'
    };
    parentComponent.parentType = 'phone';
    fixture.detectChanges();

    expect(component.responseName).toBeFalsy();
    expect(component.responseStr).toEqual('(555) 555-5555 - Mobile');
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();

    parentComponent.parentResponse = {
      type: 'workLandline',
      number: '(555) 555-5555'
    };
    parentComponent.parentType = 'phone';
    fixture.detectChanges();

    expect(component.responseName).toBeFalsy();
    expect(component.responseStr).toEqual('(555) 555-5555 - Work Landline');
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "boolean"', () => {
    parentComponent.parentResponse = false;
    parentComponent.parentType = 'boolean';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('No');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();

    parentComponent.parentResponse = true;
    parentComponent.parentType = 'boolean';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Yes');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();

    parentComponent.parentResponse = null;
    parentComponent.parentType = 'boolean';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "ethnicity"', () => {
    parentComponent.parentResponse = {
      hispanic: true,
      mexican: true,
      puertoRican: true,
      cuban: true,
      otherHispanic: {
        selected: true,
        other: 'Really Really'
      },
      nonHispanic: true,
      optOut: false
    };
    parentComponent.parentType = 'ethnicity';
    fixture.detectChanges();

    expect(component.responseStr).toEqual(
      'Hispanic or Latino, Mexican, Puerto Rican, Cuban, ' +
      'Other Hispanic or Latino: Really Really, Not Hispanic or Latino'
    );
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();

    parentComponent.parentResponse = {
      hispanic: false,
      mexican: false,
      puertoRican: false,
      cuban: false,
      otherHispanic: {
        selected: false,
        other: null
      },
      nonHispanic: false,
      optOut: true
    };
    parentComponent.parentType = 'ethnicity';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Non Disclosed');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "sex"', () => {
    parentComponent.parentResponse = {
      male: true,
      female: true,
      optOut: false
    };
    parentComponent.parentType = 'sex';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Male, Female');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();

    parentComponent.parentResponse = {
      male: false,
      female: false,
      optOut: true
    };
    parentComponent.parentType = 'sex';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Non Disclosed');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "intent"', () => {
    parentComponent.parentResponse = 'lower-payment';
    parentComponent.parentType = 'intent';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Lower my payment');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();

    parentComponent.parentResponse = {
      male: false,
      female: false,
      optOut: true
    };
    parentComponent.parentType = 'sex';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Non Disclosed');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "race"', () => {
    parentComponent.parentResponse = {
      americanIndian: {
        selected: true,
        tribe: 'once upon a tribe'
      },
      asian: true,
      asianIndian: true,
      chinese: true,
      filipino: true,
      japanese: true,
      korean: true,
      vietnamese: true,
      otherAsian: {
        selected: true,
        other: 'other asian'
      },
      africanAmerican: true,
      pacificIslander: true,
      nativeHawaiian: true,
      guamanian: true,
      samoan: true,
      otherPacificIslander: {
        selected: true,
        other: 'other pacific islander'
      },
      white: true,
      optOut: false
    };
    parentComponent.parentType = 'race';
    fixture.detectChanges();

    expect(component.responseStr).toEqual(
      'American Indian or Alaska Native: once upon a tribe, Asian, Asian Indian, ' +
      'Chinese, Filipino, Japanese, Korean, Vietnamese, Other Asian: other asian, ' +
      'Black or African American, Native Hawaiian or Other Pacific Islander, ' +
      'Native Hawaiian, Guamanian or Chamorro, Samoan, Other Pacific Islander: other pacific islander, White'
    );
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();

    parentComponent.parentResponse = {
      americanIndian: {
        selected: false,
        tribe: null
      },
      asian: false,
      asianIndian: false,
      chinese: false,
      filipino: false,
      japanese: false,
      korean: false,
      vietnamese: false,
      otherAsian: {
        selected: false,
        other: null
      },
      africanAmerican: false,
      pacificIslander: false,
      nativeHawaiian: false,
      guamanian: false,
      samoan: false,
      otherPacificIslander: {
        selected: false,
        other: null
      },
      white: false,
      optOut: true,
    };
    parentComponent.parentType = 'race';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('Non Disclosed');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "ssn"', () => {
    parentComponent.parentResponse = '123-45-6789';
    parentComponent.parentType = 'ssn';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('***-**-6789');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "ssn" if it was not previously formatted', () => {
    parentComponent.parentResponse = '123456789';
    parentComponent.parentType = 'ssn';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('***-**-6789');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "ssn" if it was not previously formatted', () => {
    parentComponent.parentResponse = '123456789';
    parentComponent.parentType = 'ssn';
    fixture.detectChanges();

    expect(component.responseStr).toEqual('***-**-6789');
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for response with type "ssn" as null if ssn is falsy', () => {
    parentComponent.parentResponse = null;
    parentComponent.parentType = 'ssn';
    fixture.detectChanges();

    expect(component.responseStr).toEqual(null);
    expect(component.responseName).toBeFalsy();
    expect(component.responseAddress).toBeFalsy();
    expect(component.responseCurrency).toBeFalsy();
  });

  it('should map the input for link', () => {
    parentComponent.parentRouterLink = '/random-link';
    fixture.detectChanges();

    expect(component.link).toEqual('/random-link');
  });

  it('should map the input for edit', () => {
    parentComponent.parentEdit = 'Random Edit';
    fixture.detectChanges();

    expect(component.edit).toEqual('Random Edit');
  });

  it('should default the edit input to "Edit" if not given', () => {
    expect(component.edit).toEqual('Edit');
  });

  describe('HTML integration tests', () => {
    let title;
    let response;
    let edit;
    let link;
    let type;
    beforeEach(() => {
      title = 'Title';
      response = 'Response';
      edit = 'Edit me';
      link = '/random-link';
      type = null;
      parentComponent.parentTitle = title;
      parentComponent.parentResponse = response;
      parentComponent.parentRouterLink = link;
      parentComponent.parentType = type;
      fixture.detectChanges();
    });

    it('should display the mapped title in the p.title', () => {
      expect(fixture.debugElement.query(By.css('p.title')).nativeElement.textContent).toEqual(title);
    });

    it('should display the mapped response in the p.response', () => {
      expect(fixture.debugElement.query(By.css('p.response')).nativeElement.textContent).toEqual(response);
    });

    it('should display the mapped response in the p.response formatted correctly for an address', () => {
      parentComponent.parentResponse = {
        street: 'street',
        unit: 'unit',
        city: 'city',
        state: 'state',
        zip: 'zip'
      };
      parentComponent.parentType = 'address';
      fixture.detectChanges();

      const html = fixture.debugElement.query(By.css('p.response')).nativeElement.innerHTML;
      expect(html).toContain('street<br');
      expect(html).toContain('unit');
      expect(html).toContain('city, state zip');
    });

    it('should display the mapped response in the p.response formatted correctly for currency', () => {
      parentComponent.parentResponse = 100000;
      parentComponent.parentType = 'currency';
      fixture.detectChanges();

      const html = fixture.debugElement.query(By.css('p.response')).nativeElement.textContent;
      expect(html).toEqual('$100,000');
    });

    it('should display the mapped response in the p.response formatted correctly for name', () => {
      parentComponent.parentResponse = {
        first: 'calvin',
        middle: 'k',
        last: 'cox',
        suffix: 'jr'
      };
      parentComponent.parentType = 'name';
      fixture.detectChanges();

      let html = fixture.debugElement.query(By.css('p.response')).nativeElement.textContent;
      expect(html).toEqual('calvin k cox Jr');

      parentComponent.parentResponse = {
        first: 'calvin',
        last: 'cox',
        suffix: 'sr'
      };
      parentComponent.parentType = 'name';
      fixture.detectChanges();

      html = fixture.debugElement.query(By.css('p.response')).nativeElement.textContent;
      expect(html).toEqual('calvin cox Sr');

      parentComponent.parentResponse = {
        first: 'calvin',
        last: 'cox',
      };
      parentComponent.parentType = 'name';
      fixture.detectChanges();

      html = fixture.debugElement.query(By.css('p.response')).nativeElement.textContent;
      expect(html).toEqual('calvin cox');
    });

    it('should link to the mapped routerLink on the div', () => {
      expect(fixture.debugElement.query(By.css('a')).attributes['ng-reflect-router-link']).toEqual(link);
    });

    it('should display the mapped edit in the span.edit', () => {
      parentComponent.parentEdit = edit;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span.edit')).nativeElement.textContent).toEqual(edit);
    });

    it('should display the default edit in the span.edit if one is not given', () => {
      expect(fixture.debugElement.query(By.css('span.edit')).nativeElement.textContent).toEqual('Edit');
    });

    it('should not display the edit link if their is not a routerLink passed in', () => {
      parentComponent.parentRouterLink = '';
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('span.edit'))).toBeFalsy();
    });
  });
});
