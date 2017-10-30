import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let router;
  let activatedRoute;
  let linkOptions;
  let saveAction$;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
        BaseComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, ActivatedRoute], (_router_, _activatedRoute_) => {
    router = _router_;
    spyOn(router, 'navigate');

    saveAction$ = Observable.of(['/foo']);
    spyOn(saveAction$, 'take').and.callThrough();

    activatedRoute = _activatedRoute_;
    activatedRoute.data.map.and.callFake(filter => {
      if (filter({ actionBtnGroupLinkOptions: true })) {
        linkOptions = {
          back: {
            link: {
              routerLink: '/new-customer/email'
            }
          },
          next: true,
          saveAndExit: true
        };
        return Observable.of(linkOptions);
      }
      if (filter({saveAction: true})) {
        return saveAction$;
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have an actionBtnLinkOptions$ for setting up the form controls', async(() => {
    component.actionBtnLinkOptions$.subscribe(options => {
      expect(options).toEqual(linkOptions);
    });
  }));

  it('should only get the save action one time', () => {
    expect(saveAction$.take).toHaveBeenCalledWith(1);
  });

  it('should make the saveAction available', () => {
    expect(component.saveAction).toEqual(['/foo']);
  });

  it('should have a onSubmit method', () => {
    expect(component.onSubmit).toEqual(jasmine.any(Function));
  });

  describe('onSubmit', () => {
    it('should call the router.navigate method with the save action', () => {
      component.onSubmit();
      expect(router.navigate).toHaveBeenCalledWith(['/foo']);
    });

    it('should not call the router.navigate method if the save action is not defined', () => {
      saveAction$ = Observable.of(undefined);
      component.ngOnInit();
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not call the router.navigate method if the save action is not an array or an empty array', () => {
      saveAction$ = Observable.of([]);
      component.ngOnInit();
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();

      saveAction$ = Observable.of({});
      component.ngOnInit();
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();

      saveAction$ = Observable.of(1);
      component.ngOnInit();
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();

      saveAction$ = Observable.of('not_an_array');
      component.ngOnInit();
      component.onSubmit();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
