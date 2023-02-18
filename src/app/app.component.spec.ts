import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wa'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('wa');
  });

  describe('callClearMessages()', () => {
    it('Calls clearMessages() in the message service if the current route is /view', () => {
      //Arrange
      spyOn(component, 'callClearMessages');
      //component['router'].url = '/view';
      let link = fixture.debugElement.nativeElement.querySelector('a');

      //Act
      link.click();

      //Assert
      tick();
	    expect(component.callClearMessages).toHaveBeenCalled();
      expect(component['messageService'].clearAllMessages).toHaveBeenCalled();
    });
    it('Calls does not call clearMessages() if the current route not /view', () => {
      //Arrange
      spyOn(component, 'callClearMessages');
      let link = fixture.debugElement.nativeElement.querySelector('a');

      //Act
      link.click();

      //Assert
      tick();
	    expect(component.callClearMessages).not.toHaveBeenCalled();
      expect(component['messageService'].clearAllMessages).not.toHaveBeenCalled();
    });
  });
});
