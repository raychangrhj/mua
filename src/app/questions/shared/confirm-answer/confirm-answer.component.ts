import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import { NameState } from '../../customer/shared/ngrx/reducers/name/name.reducer';
import { AddressState } from '../../customer/shared/ngrx/reducers/address/address.reducer';
import { PropertyLocationState } from '../../mortgage-intent/shared/ngrx/reducers/property-location/property-location.reducer';
import {
  EthnicityState,
  RaceState,
  SexState
} from '../../required-questions/ngrx/reducers/government-questions.reducer';
import { PhoneState } from '../../customer/shared/ngrx/reducers/phone/phone.reducer';
import * as selectDefinitions from '../../../shared/select-definitions';

@Component({
  selector: 'regions-confirm-answer',
  templateUrl: './confirm-answer.component.html',
  styleUrls: ['./confirm-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsConfirmAnswerComponent implements OnInit, OnChanges {

  @Input('title')
  public title: string;

  @Input('response')
  private response: string
    | number
    | boolean
    | EthnicityState
    | RaceState
    | SexState
    | AddressState
    | PropertyLocationState
    | NameState
    | PhoneState;

  @Input('edit')
  public edit: string;

  @Input('link')
  public link: string | string[];

  @Input('type')
  private type: string;

  public responseName: NameState = null;
  public responseAddress: AddressState | PropertyLocationState = null;
  public responseStr: string | number = null;
  public responseCurrency: number = null;

  public getSuffixDescription(str: string): string {
    const dict = {
     'jr': 'Jr',
     'sr': 'Sr',
     'ii': 'II',
     'iii': 'III',
     'iv': 'IV',
     'v': 'V',
     'vi': 'VI',
    };
    return dict[str];
  }

  public ngOnChanges() {
    this.responseAddress = null;
    this.responseStr = null;
    this.responseName = null;
    this.responseCurrency = null;

    const buildDataObject = {
      'intent': () => {
        this.responseStr = selectDefinitions.intents[
          <string>this.response
        ];
      },
      'account-type': () => {
        this.responseStr = selectDefinitions.accountTypes[
          <string>this.response
        ];
      },
      'marital-status': () => {
        const intent = <string>this.response;
        const dict = {
          'married': 'Married',
          'separated': 'Legally Separated',
          'unmarried': 'Unmarried/Widowed/Divorced'
        };
        this.responseStr = dict[intent];
      },
      'name': () => {
        this.responseName = <NameState>this.response;
      },
      'address': () => {
        this.responseAddress = <AddressState>this.response;
      },
      'propertyLocation': () => {
        this.responseAddress = <PropertyLocationState>this.response;
      },
      'ssn': () => {
        const response: string = <string>this.response || '';
        let splitResponse: string[] = response.split('-');
        if (splitResponse.length === 3) {
          this.responseStr = `***-**-${splitResponse[2]}`
        } else {
          splitResponse = response.split('');
          this.responseStr = splitResponse.length === 9 ? `***-**-${splitResponse.splice(-4).join('')}` : null;
        }
      },
      'currency': () => {
        this.responseCurrency = <number>this.response;
      },
      'boolean': () => {
        if (this.response !== null) {
          this.responseStr = <boolean>this.response ? 'Yes' : 'No';
        } else {
          this.responseStr = ''
        }
      },
      'ethnicity': () => {
        const result = [];
        const state: EthnicityState = <EthnicityState>this.response;
        if (state && state.hispanic) {
          result.push('Hispanic or Latino');
        }
        if (state && state.mexican) {
          result.push('Mexican');
        }
        if (state && state.puertoRican) {
          result.push('Puerto Rican');
        }
        if (state && state.cuban) {
          result.push('Cuban');
        }
        if (state && state.otherHispanic && state.otherHispanic.selected) {
          result.push(`Other Hispanic or Latino: ${state.otherHispanic.other}`);
        }
        if (state && state.nonHispanic) {
          result.push('Not Hispanic or Latino');
        }
        if (state && state.optOut) {
          result.push('Non Disclosed');
        }

        this.responseStr = result.join(', ');
      },
      'sex': () => {
        const result = [];
        const state: SexState = <SexState>this.response;
        if (state && state.male) {
          result.push('Male');
        }
        if (state && state.female) {
          result.push('Female');
        }
        if (state && state.optOut) {
          result.push('Non Disclosed');
        }

        this.responseStr = result.join(', ');
      },
      'phone': () => {
        const state: PhoneState = <PhoneState>this.response;
        if (state && state.type && state.number) {
          const dict = {
            'mobile': 'Mobile',
            'landline': 'Landline',
            'workMobile': 'Work Mobile',
            'workLandline': 'Work Landline'
          };
          this.responseStr = `${state.number} - ${dict[state.type]}`;
        }
      },
      'race': () => {
        const result = [];
        const state: RaceState = <RaceState>this.response;
        if (state && state.americanIndian && state.americanIndian.selected) {
          result.push(`American Indian or Alaska Native: ${state.americanIndian.tribe}`);
        }
        if (state && state.asian) {
          result.push('Asian');
        }
        if (state && state.asianIndian) {
          result.push('Asian Indian');
        }
        if (state && state.chinese) {
          result.push('Chinese');
        }
        if (state && state.filipino) {
          result.push('Filipino');
        }
        if (state && state.japanese) {
          result.push('Japanese');
        }
        if (state && state.korean) {
          result.push('Korean');
        }
        if (state && state.vietnamese) {
          result.push('Vietnamese');
        }
        if (state && state.otherAsian && state.otherAsian.selected) {
          result.push(`Other Asian: ${state.otherAsian.other}`);
        }
        if (state && state.africanAmerican) {
          result.push('Black or African American');
        }
        if (state && state.pacificIslander) {
          result.push('Native Hawaiian or Other Pacific Islander');
        }
        if (state && state.nativeHawaiian) {
          result.push('Native Hawaiian');
        }
        if (state && state.guamanian) {
          result.push('Guamanian or Chamorro');
        }
        if (state && state.samoan) {
          result.push('Samoan');
        }
        if (state && state.otherPacificIslander && state.otherPacificIslander.selected) {
          result.push(`Other Pacific Islander: ${state.otherPacificIslander.other}`);
        }
        if (state && state.white) {
          result.push('White');
        }
        if (state && state.optOut) {
          result.push('Non Disclosed');
        }

        this.responseStr = result.join(', ');
      },
      'default': () => {
        this.responseStr = <string | number>this.response;
      }
    };
    const executeSection = buildDataObject[this.type];
    executeSection ? executeSection() : buildDataObject['default']();
  }

  public ngOnInit() {
    this.edit = this.edit || 'Edit';
  }
}
