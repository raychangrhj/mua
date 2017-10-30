import { FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

/* tslint:disable */
export const validMoneyRegex = /^(\$)?([1-9]{1}[0-9]{0,2})(\,\d{3})*(\.\d{2})?$|^(\$)?([1-9]{1}[0-9]{0,2})(\d{3})*(\.\d{2})?$|^(0)?(\.\d{2})?$|^(\$0)?(\.\d{2})?$|^(\$\.)(\d{2})?$/;
export const validPhoneRegex = /^\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})$/;
export const validSSNRegex = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;
export const validPositiveNumberRegex = /-?\.?(\d+((\.|,| )\d+)?)/;
export const validZipRegex = /^\b\d{5}(-\d{4})?\b$/;
export const simpleDateRegex = /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2})$/;
export const states = [{
  description: 'Alabama',
  value: 'AL'
}, {
  description: 'Alaska',
  value: 'AK'
}, {
  description: 'American Samoa',
  value: 'AS'
}, {
  description: 'Arizona',
  value: 'AZ'
}, {
  description: 'Arkansas',
  value: 'AR'
}, {
  description: 'California',
  value: 'CA'
}, {
  description: 'Colorado',
  value: 'CO'
}, {
  description: 'Connecticut',
  value: 'CT'
}, {
  description: 'Delaware',
  value: 'DE'
}, {
  description: 'District Of Columbia',
  value: 'DC'
}, {
  description: 'Federated States Of Micronesia',
  value: 'FM'
}, {
  description: 'Florida',
  value: 'FL'
}, {
  description: 'Georgia',
  value: 'GA'
}, {
  description: 'Guam',
  value: 'GU'
}, {
  description: 'Hawaii',
  value: 'HI'
}, {
  description: 'Idaho',
  value: 'ID'
}, {
  description: 'Illinois',
  value: 'IL'
}, {
  description: 'Indiana',
  value: 'IN'
}, {
  description: 'Iowa',
  value: 'IA'
}, {
  description: 'Kansas',
  value: 'KS'
}, {
  description: 'Kentucky',
  value: 'KY'
}, {
  description: 'Louisiana',
  value: 'LA'
}, {
  description: 'Maine',
  value: 'ME'
}, {
  description: 'Marshall Islands',
  value: 'MH'
}, {
  description: 'Maryland',
  value: 'MD'
}, {
  description: 'Massachusetts',
  value: 'MA'
}, {
  description: 'Michigan',
  value: 'MI'
}, {
  description: 'Minnesota',
  value: 'MN'
}, {
  description: 'Mississippi',
  value: 'MS'
}, {
  description: 'Missouri',
  value: 'MO'
}, {
  description: 'Montana',
  value: 'MT'
}, {
  description: 'Nebraska',
  value: 'NE'
}, {
  description: 'Nevada',
  value: 'NV'
}, {
  description: 'New Hampshire',
  value: 'NH'
}, {
  description: 'New Jersey',
  value: 'NJ'
}, {
  description: 'New Mexico',
  value: 'NM'
}, {
  description: 'New York',
  value: 'NY'
}, {
  description: 'North Carolina',
  value: 'NC'
}, {
  description: 'North Dakota',
  value: 'ND'
}, {
  description: 'Northern Mariana Islands',
  value: 'MP'
}, {
  description: 'Ohio',
  value: 'OH'
}, {
  description: 'Oklahoma',
  value: 'OK'
}, {
  description: 'Oregon',
  value: 'OR'
}, {
  description: 'Palau',
  value: 'PW'
}, {
  description: 'Pennsylvania',
  value: 'PA'
}, {
  description: 'Puerto Rico',
  value: 'PR'
}, {
  description: 'Rhode Island',
  value: 'RI'
}, {
  description: 'South Carolina',
  value: 'SC'
}, {
  description: 'South Dakota',
  value: 'SD'
}, {
  description: 'Tennessee',
  value: 'TN'
}, {
  description: 'Texas',
  value: 'TX'
}, {
  description: 'Utah',
  value: 'UT'
}, {
  description: 'Vermont',
  value: 'VT'
}, {
  description: 'Virgin Islands',
  value: 'VI'
}, {
  description: 'Virginia',
  value: 'VA'
}, {
  description: 'Washington',
  value: 'WA'
}, {
  description: 'West Virginia',
  value: 'WV'
}, {
  description: 'Wisconsin',
  value: 'WI'
}, {
  description: 'Wyoming',
  value: 'WY'
}];
/* tslint:enable */

export function phoneValidator(c: FormControl) {
  if (!c.value || !c.value.replace || !c.value.trim) {
    return { phone: true }
  }
  const control: FormControl = ({
    value: c.value.replace(/\D/g, '')
  } as FormControl);
  return control.value.trim() ? CustomValidators.phone('US')(control) : { phone: true };
}

export function stateCodeValidator(c: FormControl) {
  if (!c.value || !c.value.indexOf || !c.value.trim) {
    return { stateCode: true }
  }
  return states.map(state => state.value).indexOf(c.value.trim()) !== -1 ? null : { stateCode: true };
}

export function specialDateValidator(c: FormControl) {
  if (!c.value || !c.value.split) {
    return { date: true };
  }
  // TODO this might be overly verbose to push this through the date validator... but oh well
  const control: FormControl = ({
    value: c.value.split('/').join('/01/')
  } as FormControl);
  return simpleDateRegex.test(c.value) ? CustomValidators.date(control) : { date: true };
}
