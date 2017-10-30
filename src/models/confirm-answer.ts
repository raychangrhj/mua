import { Observable } from 'rxjs/Observable';

import { NameState } from '../app/questions/customer/shared/ngrx/reducers/name/name.reducer';
import { PropertyLocationState } from '../app/questions/mortgage-intent/shared/ngrx/reducers/property-location/property-location.reducer';
import { AddressState } from '../app/questions/customer/shared/ngrx/reducers/address/address.reducer';

export interface ConfirmAnswer {
  title: string;
  returnLink: string | any[];
  response?: Observable<string> | Observable<number> | Observable<PropertyLocationState> | Observable<AddressState> | Observable<NameState>;
  selector?: any;
  edit?: string;
  type?: string;
}
