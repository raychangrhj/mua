import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ActionBtnGroupComponent } from './action-btn-group.component';
import {
  ActionBtnGroupLinkOptions,
  ActionBtnGroupSaveAndExitLinkObject
} from '../../../models/action-btn-group-link-options';

@Component({
  selector: 'regions-test-component-wrapper',
  template: `
    <regions-action-btn-group
      [linkOptions]="parentLinkOptions"
      [valid]="parentValid"
    >
      <div class="ng-content-stuff"></div>
    </regions-action-btn-group>
  `
})
class TestComponentWrapperComponent {
  public parentLinkOptions: ActionBtnGroupLinkOptions;
  public parentValid: boolean;
}

// TODO this is only testing routerLink no other link params
describe('ActionBtnGroupComponent', () => {
  let parentComponent: TestComponentWrapperComponent;
  let component: ActionBtnGroupComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;
  let cancelLink;
  let backLink;
  let nextLink;
  let saveLink;
  let exitLink;
  let ngContentStuff;
  const selectElements = () => {
    cancelLink = fixture.debugElement.query(By.css('.btn-reject'));
    backLink = fixture.debugElement.query(By.css('.btn-back'));
    ngContentStuff = fixture.debugElement.query(By.css('.ng-content-stuff'));
    nextLink = fixture.debugElement.query(By.css('.btn-next'));
    saveLink = fixture.debugElement.query(By.css('.btn-accept'));
    exitLink = fixture.debugElement.query(By.css('.exit-link'));
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponentWrapperComponent,
        ActionBtnGroupComponent
      ],
      imports: [
        RouterTestingModule
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

  describe('HTML integration test :: regardless of input parameters', () => {
    beforeEach(() => {
      selectElements();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should have the ng-content tag', () => {
      expect(ngContentStuff).toBeTruthy();
    });
  });

  describe('with no input parameters', () => {
    it('should not default options', () => {
      expect(component.options).toBeFalsy();
    });

    describe('HTML integration tests', () => {
      beforeEach(() => {
        selectElements();
      });

      it('should not show the cancel link', () => {
        expect(cancelLink).toBeFalsy();
      });

      it('should not show the back link', () => {
        expect(backLink).toBeFalsy();
      });

      it('should not show the next link', () => {
        expect(nextLink).toBeFalsy();
      });

      it('should not show the save link', () => {
        expect(saveLink).toBeFalsy();
      });

      it('should not show the save and exit link', () => {
        expect(exitLink).toBeFalsy();
      });
    });
  });

  describe('HTML integration tests :: with no valid passed in', () => {
    it('should not disabled the submit buttons by default', () => {
      parentComponent.parentLinkOptions = {
        next: true,
      };
      fixture.detectChanges();
      selectElements();

      expect(nextLink).toBeTruthy();
      expect(nextLink.nativeElement.attributes.disabled).toBeFalsy();

      parentComponent.parentLinkOptions = {
        save: true,
      };
      fixture.detectChanges();
      selectElements();

      expect(saveLink).toBeTruthy();
      expect(saveLink.nativeElement.attributes.disabled).toBeFalsy();
    });
  });

  describe('HTML integration tests :: with a false valid passed in', () => {
    it('should not disabled the submit buttons', () => {
      parentComponent.parentLinkOptions = {
        next: true,
      };
      parentComponent.parentValid = false;
      fixture.detectChanges();
      selectElements();

      expect(nextLink).toBeTruthy();
      expect(nextLink.nativeElement.attributes.disabled).toBeTruthy();

      parentComponent.parentLinkOptions = {
        save: true,
      };
      fixture.detectChanges();
      selectElements();

      expect(saveLink).toBeTruthy();
      expect(saveLink.nativeElement.attributes.disabled).toBeTruthy();
    });
  });

  describe('using all default text labels and link values', () => {
    beforeEach(() => {
      parentComponent.parentLinkOptions = {
        next: true,
        save: true,
        back: {
          link: {
            routerLink: '/back'
          }
        },
        cancel: {
          link: {
            routerLink: '/cancel'
          }
        },
        saveAndExit: true
      };
      fixture.detectChanges();
    });

    it('should not modify the original options', () => {
      expect(component.options).not.toBe(parentComponent.parentLinkOptions);
      expect(parentComponent.parentLinkOptions.next).toEqual(true);
      expect(parentComponent.parentLinkOptions.save).toEqual(true);
      expect(parentComponent.parentLinkOptions.back.text).toBeUndefined();
      expect(parentComponent.parentLinkOptions.cancel.text).toBeUndefined();
      expect(parentComponent.parentLinkOptions.saveAndExit).toEqual(true);
    });

    it('should default the cancel text to "Cancel"', () => {
      expect(component.options.cancel.text).toEqual('Cancel');
    });

    it('should map the cancel link to the value from link options', () => {
      expect(component.options.cancel.link.routerLink).toEqual('/cancel');
    });

    it('should default the back text to "Back"', () => {
      expect(component.options.back.text).toEqual('Back');
    });

    it('should map the back link to the value from link options', () => {
      expect(component.options.back.link.routerLink).toEqual('/back');
    });

    it('should default the save text to "Save"', () => {
      expect(component.options.save).toEqual('Save');
    });

    it('should default the next text to "Next"', () => {
      expect(component.options.next).toEqual('Next');
    });

    it('should default the save and exit text to "Save and Exit"', () => {
      expect((component.options.saveAndExit as ActionBtnGroupSaveAndExitLinkObject).text).toEqual('Save and Exit');
    });

    it('should default the save and exit link to "/save-and-exit"', () => {
      expect((component.options.saveAndExit as ActionBtnGroupSaveAndExitLinkObject).link).toEqual({
        routerLink: '/save-and-exit'
      });
    });

    describe('HTML integration tests', () => {
      beforeEach(() => {
        selectElements();
      });

      it('should show the cancel link', () => {
        expect(cancelLink).toBeTruthy();
        expect(cancelLink.nativeElement.textContent).toEqual('Cancel');
        expect(cancelLink.nativeElement.attributes.getNamedItem('href').value).toEqual('/cancel');
      });

      it('should show the back link', () => {
        expect(backLink).toBeTruthy();
        expect(backLink.nativeElement.textContent).toEqual('Back');
        expect(backLink.nativeElement.attributes.getNamedItem('href').value).toEqual('/back');
      });

      it('should show the next link', () => {
        expect(nextLink).toBeTruthy();
        expect(nextLink.nativeElement.textContent).toEqual('Next');
      });

      it('should show the save link', () => {
        expect(saveLink).toBeTruthy();
        expect(saveLink.nativeElement.textContent).toEqual('Save');
      });

      it('should show the save and exit link', () => {
        expect(exitLink).toBeTruthy();
        expect(exitLink.nativeElement.textContent).toEqual('Save and Exit');
        expect(exitLink.nativeElement.attributes.getNamedItem('href').value).toEqual('/save-and-exit');
      });
    });
  });

  describe('using all custom text labels and link values', () => {
    beforeEach(() => {
      parentComponent.parentLinkOptions = {
        save: 'Something Save',
        next: 'Something Next',
        back: {
          text: 'Something Back',
          link: {
            routerLink: '/back-somewhere'
          }
        },
        cancel: {
          text: 'Something Cancel',
          link: {
            routerLink: '/cancel-somewhere'
          }
        },
        saveAndExit: {
          text: 'Save and Exit Something',
          link: {
            routerLink: '/save-and-exit-somewhere'
          }
        }
      };
      fixture.detectChanges();
    });

    it('should set the options from the input', () => {
      expect(component.options).toEqual(parentComponent.parentLinkOptions);
      expect(component.options).not.toBe(parentComponent.parentLinkOptions);
    });

    describe('HTML integration tests', () => {
      beforeEach(() => {
        selectElements();
      });

      it('should show the cancel link', () => {
        expect(cancelLink).toBeTruthy();
        expect(cancelLink.nativeElement.textContent).toEqual('Something Cancel');
        expect(cancelLink.nativeElement.attributes.getNamedItem('href').value).toEqual('/cancel-somewhere');
      });

      it('should show the back link', () => {
        expect(backLink).toBeTruthy();
        expect(backLink.nativeElement.textContent).toEqual('Something Back');
        expect(backLink.nativeElement.attributes.getNamedItem('href').value).toEqual('/back-somewhere');
      });

      it('should show the save link', () => {
        expect(saveLink).toBeTruthy();
        expect(saveLink.nativeElement.textContent).toEqual('Something Save');
      });

      it('should show the next link', () => {
        expect(nextLink).toBeTruthy();
        expect(nextLink.nativeElement.textContent).toEqual('Something Next');
      });

      it('should show the save and exit link', () => {
        expect(exitLink).toBeTruthy();
        expect(exitLink.nativeElement.textContent).toEqual('Save and Exit Something');
        expect(exitLink.nativeElement.attributes.getNamedItem('href').value).toEqual('/save-and-exit-somewhere');
      });
    });
  });
});
