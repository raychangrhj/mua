import {
  async,
  ComponentFixture,
  inject,
  TestBed
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { GeneralWelcomeComponent } from './welcome.component';

describe('GeneralWelcomeComponent', () => {
  let component: GeneralWelcomeComponent;
  let fixture: ComponentFixture<GeneralWelcomeComponent>;
  let getStartedButton;
  let continueSection;
  let requirements;
  let isCoBorrowerPage;
  const selectElements = () => {
    getStartedButton = fixture.debugElement.query(By.css('.btn-continue'));
    continueSection = fixture.debugElement.query(By.css('.continue'));
    requirements = fixture.debugElement.query(By.css('.requirements'));
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralWelcomeComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: jasmine.createSpyObj('activatedRoute.data', ['take', 'map'])
          }
        }
      ]
    })
      .compileComponents();
  }));

  let activatedRoute;
  let subscribeSpy;
  beforeEach(inject([ActivatedRoute], (_activatedRoute_) => {
    subscribeSpy = jasmine.createSpy('subscribe');

    activatedRoute = _activatedRoute_;
    activatedRoute.data.take.and.returnValue({
      subscribe: subscribeSpy
    });
    isCoBorrowerPage = true;
    activatedRoute.data.map.and.returnValue(Observable.of(isCoBorrowerPage));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('getting the route data for the interface', () => {
    let routeData;
    beforeEach(() => {
      routeData = {
        gettingStartedLink: '/foo',
        showContinue: true,
        requirements: [{
          imgSrc: 'assets/images/icn-id.svg',
          title: 'Personal'
        }, {
          imgSrc: 'assets/images/icn-business.svg',
          title: 'Business'
        }]
      };
      subscribeSpy.calls.argsFor(0)[0](routeData);
      fixture.detectChanges();
    });

    it('should get the data off the route for building out the interface', () => {
      expect(component.options).toEqual(routeData);
    });

    it('should only take the first value from the data', () => {
      expect(activatedRoute.data.take).toHaveBeenCalledWith(1);
    });
  });

  describe('HTML integration tests', () => {
    describe('without any route data', () => {
      beforeEach(() => {
        selectElements();
      });

      it('should not have a get started button', () => {
        expect(getStartedButton).toBeNull();
      });

      it('should not have a continue section', () => {
        expect(continueSection).toBeNull();
      });

      it('should not have a requirements section', () => {
        expect(requirements).toBeNull();
      });
    });

    describe('with route data', () => {
      let routeData;
      beforeEach(() => {
        routeData = {
          gettingStartedLink: '/foo',
          continueLink: '/bar',
          requirements: [{
            imgSrc: 'assets/images/icn-id.svg',
            title: 'Personal'
          }, {
            imgSrc: 'assets/images/icn-business.svg',
            title: 'Business'
          }]
        };
        subscribeSpy.calls.argsFor(0)[0](routeData);
        fixture.detectChanges();

        selectElements();
      });

      it('should have a get started button', () => {
        expect(getStartedButton).toBeTruthy();
        expect(getStartedButton.nativeElement.attributes['href'].value).toEqual(routeData.gettingStartedLink);
      });

      it('should have a continue section', () => {
        expect(continueSection).toBeTruthy();
        expect(continueSection.query(By.css('.btn-secondary')).nativeElement.attributes['href'].value).toEqual(routeData.continueLink);
      });

      it('should have a requirements section with each requirement in it', () => {
        expect(requirements).toBeTruthy();

        routeData.requirements.forEach((requirement, i) => {
          const title = fixture.debugElement.query(By.css(`.requirement-${i} p`)).nativeElement.textContent;
          expect(title).toEqual(requirement.title);

          const imgSrc = fixture.debugElement.query(By.css(`.requirement-${i} img`)).nativeElement.attributes['src'].value;
          expect(imgSrc).toEqual(requirement.imgSrc);
        });
      });
    });
  });
});
