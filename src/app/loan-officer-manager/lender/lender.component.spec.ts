import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderComponent } from './lender.component';
import { LenderService } from '../../lender/services/lender.service';

describe('LenderComponent', () => {
  let component: LenderComponent;
  let fixture: ComponentFixture<LenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LenderService,
          useValue: jasmine.createSpyObj('LenderService', ['getMLO'])
        }
      ],
      declarations: [
        LenderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have method to remove nonnumeric characters from strings', () => {
    expect(component.cleanString('1-1-2-')).toEqual('112');
    expect(component.cleanString('abc123')).toEqual('123');
    expect(component.cleanString('1!2@3#4$5%6^&7')).toEqual('1234567');
  });
});
