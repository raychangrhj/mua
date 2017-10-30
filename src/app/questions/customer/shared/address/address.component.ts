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
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import {
  getCustomerAddressState,
  State
} from '../ngrx/reducers/index.reducer';
import { AddressState } from '../ngrx/reducers/address/address.reducer';
import { AddressUpdateAction } from '../ngrx/actions/address/address.action';
import { QuestionsBaseComponent } from '../../../shared/questions-base/questions-base.component';
import {
  stateCodeValidator,
  states,
  validZipRegex
} from '../../../../shared/form-validators';
import { BorrowerCacheService } from '../../../../core/borrower-cache.service';

@Component({
  selector: 'regions-address',
  templateUrl: './address.component.html',
  styleUrls: ['../../../../shared/top-level.component.scss', './address.component.scss']
})
export class QuestionsCustomerAddressComponent extends QuestionsBaseComponent implements OnInit {

  @ViewChild('autocomplete')
  private autoComplete: ElementRef;

  public stateOptions = states;
  public isCoBorrowerPage$: Observable<boolean>;

  public useBorrowerAddress(bool: boolean) {
    if (bool) {
      const address: AddressState = this.borrowerCacheService.getBorrowerAddress();
      if (address) {
        if (address.street) { this.form.controls['street'].setValue(address.street); }
        if (address.unit) { this.form.controls['unit'].setValue(address.unit); }
        if (address.city) { this.form.controls['city'].setValue(address.city); }
        if (address.state) { this.form.controls['state'].setValue(address.state); }
        if (address.zip) { this.form.controls['zip'].setValue(address.zip); }
      }
    } else {
      this.form.reset();
    }
  }

  public ngOnInit() {
    super.ngOnInit();

    this.isCoBorrowerPage$ = this.activatedRoute.data.map(data => data.isCoBorrowerPage);

    this.store.select(getCustomerAddressState)
      .take(1)
      .subscribe((address: AddressState) => {
        if (address.street) { this.form.controls['street'].setValue(address.street); }
        if (address.unit) { this.form.controls['unit'].setValue(address.unit); }
        if (address.city) { this.form.controls['city'].setValue(address.city); }
        if (address.state) { this.form.controls['state'].setValue(address.state); }
        if (address.zip) { this.form.controls['zip'].setValue(address.zip); }
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
          const state = place.address_components.find(obj => obj.types.indexOf('administrative_area_level_1') > -1);
          const postal = place.address_components.find(obj => obj.types.indexOf('postal_code') > -1);
          const postalSuffix = place.address_components.find(obj => obj.types.indexOf('postal_code_suffix') > -1);
          let zip = postal ? postal.long_name : null;
          zip += zip
            ? postalSuffix ? `-${postalSuffix.long_name}` : ''
            : null;
          this.form.controls['street'].setValue(street);
          this.form.controls['city'].setValue(city ? city.long_name : null);
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
    protected borrowerCacheService: BorrowerCacheService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    super(router, activatedRoute, store);
    this.onSubmitMethod = () => {
      this.store.dispatch(new AddressUpdateAction(
        this.form.value
      ));
    };
    this.form = formBuilder.group({
      street: [null, Validators.required],
      unit: [],
      city: [null, Validators.required],
      state: [null, [Validators.required, stateCodeValidator]],
      zip: [null, [Validators.required, Validators.pattern(validZipRegex)]],
    });
  }

}
