import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MessageService } from './services/message.service';

describe('AppComponent', () => {

  const routes: Routes = [
    {path: '', redirectTo: '/upload', pathMatch: 'full'},
    {path: 'upload', component: FileUploadComponent},
    {path: 'view', component: ChatViewComponent}
  ];

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['clearAllMessages']);
  mockMessageService.clearAllMessages.and.callFake;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatDialogModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: MessageService, useValue: mockMessageService }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('callClearMessages()', () => {
    it('Calls clearMessages() in the message service if the current route is /view', fakeAsync(() => {
      //Arrange
      spyOn(component, 'callClearMessages');
      router.navigate(['/view']);
      let link = fixture.debugElement.nativeElement.querySelector('a');

      //Act
      link.click();

      //Assert
      tick();
      expect(router.url).toEqual('/view'); //failing here
	    expect(component.callClearMessages).toHaveBeenCalled();
      expect(mockMessageService.clearAllMessages).toHaveBeenCalled();
    }));
    it('Does not call clearMessages() if the current route not /view', fakeAsync(() => {
      //Arrange
      //mockMessageService.clearAllMessages();
      spyOn(component, 'callClearMessages');
      router.navigate(['/upload']);
      let link = fixture.debugElement.nativeElement.querySelector('a');

      //Act
      link.click();

      //Assert
      tick();
	    expect(component.callClearMessages).toHaveBeenCalled();
      expect(mockMessageService.clearAllMessages).not.toHaveBeenCalled();
    }));
  });
});
