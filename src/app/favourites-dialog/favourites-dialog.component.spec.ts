import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageParsingService } from '../services/message-parsing.service';
import { MessageService } from '../services/message.service';

import { FavouritesDialogComponent } from './favourites-dialog.component';

describe('FavouritesDialogComponent', () => {
  let component: FavouritesDialogComponent;
  let fixture: ComponentFixture<FavouritesDialogComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockMessageParsingService: jasmine.SpyObj<MessageParsingService>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<FavouritesDialogComponent>>;
  let mockMatDialogData: any;

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['']);
  mockMessageParsingService = jasmine.createSpyObj('mockMessageParsingService', ['']);
  mockMatDialogRef = jasmine.createSpyObj('mockMatDialogRef', ['close']);
  mockMatDialogData = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ FavouritesDialogComponent ],
      providers: [{ provide: MessageService, useValue: mockMessageService },
                  { provide: MatDialogRef, useValue: mockMatDialogRef },
                  { provide: MessageParsingService, useValue: mockMessageParsingService },
                  { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('sets name to that of the messageParsingService', () => {
      //Arrange
      const testName = "User1"
      mockMessageParsingService.participant = testName;

      //Act
      component.ngOnInit();

      //Assert
      expect(component.name).toEqual(testName);
    });
  });

  describe('closeDialog()', () => {
    it('closes the dialog', () => {
      //Act
      component.closeDialog();

      //Assert
      expect(mockMatDialogRef.close).toHaveBeenCalled;
    });
  });

  describe('the dialog content', () => {
    it('displays each of the favourited messages', () => {
      //Arrange
      
      //Act

      //Assert
  
    });
    it('displays a message if no messages are favourited', () => {
      //Arrange
      component.favourites = []

      //Act

      //Assert
      //expect(fixture.debugElement.query())
    });
  });
});
