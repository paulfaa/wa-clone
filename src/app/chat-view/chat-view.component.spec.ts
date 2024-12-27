import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MessageComponent } from '../message/message.component';
import { MessageParsingService } from '../services/message-parsing.service';
import { MessageService } from '../services/message.service';
import { ChatViewComponent } from './chat-view.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { FavouritesService } from '../services/favourites.service';
import { WhatsappMessage } from '../models/models';
import { MessageType } from '../models/message-type';
import { sampleMessage1, sampleMessage2, sampleMessage3, sampleMessage4 } from '../test/testMessages';
import { MonthPipe } from '../date-picker/month.pipe';
import { SetToArrayPipe } from '../date-picker/set-to-array.pipe';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockFavouritesService: jasmine.SpyObj<FavouritesService>;
  let mockMessageParsingService: jasmine.SpyObj<MessageParsingService>;
  let mockMessages: WhatsappMessage[];
  let map = new Map<number, Set<number>>();
  map.set(2001, new Set<number>([1,2,3]));

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['$getAllMessages', '$getFilteredMessages']);
  mockFavouritesService = jasmine.createSpyObj('mockFavouritesService', ['isFavourite','addToFavourites', 'removeFromFavourites']);
  mockMessageParsingService = jasmine.createSpyObj('mockMessageParsingService', ['getYearMonthMap']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatViewComponent, MessageComponent, DatePickerComponent, MonthPipe, SetToArrayPipe ],
      providers: [
        { provide: MessageService, useValue: mockMessageService },
        { provide: FavouritesService, useValue: mockFavouritesService },
        { provide: MessageParsingService, useValue: mockMessageParsingService }
      ]
    })
    .compileComponents();

    mockMessages = [sampleMessage1, sampleMessage2, sampleMessage3, sampleMessage4];
    mockMessageService.$getAllMessages.and.returnValue(of(mockMessages));
    mockMessageService.$getFilteredMessages.and.returnValue(of(mockMessages));
    mockMessageParsingService.getYearMonthMap.and.returnValue(map); 

    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('calls messageService.$getFilteredMessages with the first date of the yearMonthMap', () => {
      //Act
      component.ngOnInit();

      //Assert
      expect(mockMessageService.$getFilteredMessages).toHaveBeenCalledWith(new Date(2001, 0));
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleFavourite', () => {
      var favouritedMessage: WhatsappMessage;

    beforeEach(() => {
      favouritedMessage = {
        id:"aeef-45gd-45hy-jfv4",
        timestamp: new Date(),
        fromMe: true,
        type: MessageType.text
      }
      //favouritedMessage = new WhatsappMessage(new Date, true, "Favourite", 12);
      mockFavouritesService['favouritesMap'] = new Map<string, WhatsappMessage>([["msg-id", favouritedMessage]]);
    });

    it('removes a message from favourites if it was already favourited', () => {
      //arrange
      mockFavouritesService.isFavourite = jasmine.createSpy().and.returnValue(true);
      expect(mockFavouritesService['favouritesMap'].has(favouritedMessage.id!)).toBeTrue;

      //act
      component.toggleFavourite(favouritedMessage);

      //assert
      expect(mockFavouritesService.removeFromFavourites).toHaveBeenCalledWith(favouritedMessage.id!);
      expect(mockFavouritesService['favouritesMap'].has(favouritedMessage.id!)).toBeFalse;
    });

    it('adds a message to favourites if it is not favourited', () => {
      //arrange
      const newMessage = sampleMessage1;
      mockFavouritesService.isFavourite = jasmine.createSpy().and.returnValue(false);
      expect(mockFavouritesService['favouritesMap'].has(newMessage.id!)).toBeFalse;

      //act
      component.toggleFavourite(newMessage);

      //assert
      expect(mockFavouritesService.addToFavourites).toHaveBeenCalledWith(newMessage);
      expect(mockFavouritesService['favouritesMap'].has(newMessage.id!)).toBeTrue;
    });
  });

  describe('page', () => {
    it('displays the message objects contained in the array', () => {
        // Arrange
        component._serviceSubscription = of(mockMessages);

        // Act
        component.ngOnInit();
        const messageCount = fixture.debugElement.queryAll(By.css('app-message')).length;
        const messageCount1 = fixture.debugElement.queryAll(By.css('.messageBubble')).length;

        // Assert
        expect(messageCount1).toEqual(4);
        
    });

    it('applies CSS correctly based on isChatOwner variable', () => {
      // Arrange
      component._serviceSubscription = of(mockMessages);

      // Act
      component.ngOnInit();
      const ownMessage = fixture.debugElement.query(By.css('.ownMessage'));

      // Assert
      expect(ownMessage).toBeTruthy();
    });
  });
});
