import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { MapsAPILoader } from '@agm/core';

import { PropertyLocationState } from '../ngrx/reducers/property-location/property-location.reducer';
import {
  PropertyLocationUpdateAction,
  PropertyLocationValidateAction
} from '../ngrx/actions/property-location/property-location.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  getMortgagePropertyLocationState,
  getMortgageTypeState,
  State
} from '../ngrx/reducers/index.reducer';
import {
  stateCodeValidator,
  states,
  validZipRegex
} from '../../../../shared/form-validators';
import { getCustomerAddressState } from '../../../customer/shared/ngrx/reducers/index.reducer';
import { AddressState } from '../../../customer/shared/ngrx/reducers/address/address.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'regions-property-location',
  templateUrl: './property-location.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './property-location.component.scss']
})
export class QuestionsMortgageIntentPropertyLocationComponent extends QuestionsBaseComponent implements OnInit {

  @ViewChild('autocomplete')
  private autoComplete: ElementRef;
  private currentAddress: PropertyLocationState;

  public isRefinance$: Observable<string>;
  public stateOptions = states;

  public useBorrowerAddress(bool: boolean) {
    if (bool) {
      if (this.currentAddress) {
        this.form.controls['street'].setValue(this.currentAddress.street || null);
        this.form.controls['unit'].setValue(this.currentAddress.unit || null);
        this.form.controls['city'].setValue(this.currentAddress.city || null);
        this.form.controls['state'].setValue(this.currentAddress.state || null);
        this.form.controls['zip'].setValue(this.currentAddress.zip || null);
      }
    } else {
      this.form.reset();
    }
  }

  public ngOnInit() {
    super.ngOnInit();

    this.store.select(getCustomerAddressState)
      .take(1)
      .subscribe((address: AddressState) => {
        this.currentAddress = (address as PropertyLocationState);
      });

    this.isRefinance$ = this.store.select(getMortgageTypeState);

    this.store.select(getMortgagePropertyLocationState)
      .take(1)
      .subscribe((propertyLocation: PropertyLocationState) => {
        this.form.controls['street'].setValue(propertyLocation.street);
        this.form.controls['unit'].setValue(propertyLocation.unit);
        this.form.controls['city'].setValue(propertyLocation.city);
        this.form.controls['county'].setValue(propertyLocation.county);
        this.form.controls['state'].setValue(propertyLocation.state);
        this.form.controls['zip'].setValue(propertyLocation.zip);
      });

    this.mapsAPILoader.load().then(() => {
      const autoComplete = new google.maps.places.Autocomplete(this.autoComplete.nativeElement, {
        types: ['address']
      });
      autoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autoComplete.getPlace();
          const isDefined = (key: any): boolean => {
            return key !== undefined && key !== null
          };
          if (!isDefined(place.name) || !isDefined(place.address_components)) {
            return;
          }
          const street = place.name;
          const city = place.address_components.find(obj => obj.types.indexOf('locality') > -1);
          const county = place.address_components.find(obj => obj.types.indexOf('administrative_area_level_2') > -1);
          const state = place.address_components.find(obj => obj.types.indexOf('administrative_area_level_1') > -1);
          const postal = place.address_components.find(obj => obj.types.indexOf('postal_code') > -1);
          const postalSuffix = place.address_components.find(obj => obj.types.indexOf('postal_code_suffix') > -1);
          let zip = postal ? postal.long_name : null;
          zip += zip
            ? postalSuffix ? `-${postalSuffix.long_name}` : ''
            : null;

          this.form.controls['street'].setValue(street);
          this.form.controls['city'].setValue(city ? city.long_name : null);
          this.form.controls['county'].setValue(county ? county.long_name : null);
          this.form.controls['state'].setValue(state ? state.short_name : null);
          this.form.controls['zip'].setValue(zip);
        });
      });
    });
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<State>,
    protected formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new PropertyLocationUpdateAction(
        this.form.value
      ));
      this.store.dispatch(new PropertyLocationValidateAction(
        this.form.value,
      ));
    };
    this.form = formBuilder.group({
      street: [null, Validators.required],
      unit: [],
      city: [null, Validators.required],
      county: [null, Validators.required],
      state: [null, [Validators.required, stateCodeValidator]],
      zip: [null, [Validators.required, Validators.pattern(validZipRegex)]],
    });
  }

}
