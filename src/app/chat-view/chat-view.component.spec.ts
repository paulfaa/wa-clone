import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MessageComponent } from '../message/message.component';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';
import { MessageService } from '../services/message.service';
import { ChatViewComponent } from './chat-view.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { FavouritesService } from '../services/favourites.service';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockFavouritesService: jasmine.SpyObj<FavouritesService>;
  let mockMessageParsingService: jasmine.SpyObj<MessageParsingService>;
  let mockMessages: Message[];
  let map = new Map<number, number[]>();
  map.set(2001, [1,2,3]);

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['$getAllMessages']);
  mockFavouritesService = jasmine.createSpyObj('mockFavouritesService', ['isFavourite','addToFavourites', 'removeFromFavourites']);
  mockMessageParsingService = jasmine.createSpyObj('mockMessageParsingService', ['getDatesMap']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatViewComponent, MessageComponent, DatePickerComponent ],
      providers: [
        { provide: MessageService, useValue: mockMessageService },
        { provide: FavouritesService, useValue: mockFavouritesService },
        { provide: MessageParsingService, useValue: mockMessageParsingService }
      ]
    })
    .compileComponents();

    mockMessages = [];
    mockMessages.push(new Message(new Date(2019, 10, 5), true, "Message contents...."));
    mockMessages.push(new Message(new Date(2020, 3, 12), true, "Lorum Ipsum"));
    mockMessages.push(new Message(new Date(2020, 10, 13), false, "Hello world..."));
    mockMessages.push(new Message(new Date(2020, 5, 14), true, "Message contents 2 ...."));
    mockMessageService.$getAllMessages.and.returnValue(of(mockMessages));
    mockMessageParsingService.getDatesMap.and.returnValue(map);

    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleFavourite', () => {
      var favouritedMessage: Message;

    beforeEach(() => {
      favouritedMessage = new Message(new Date, true, "Favourite", 12);
      mockFavouritesService['favouritesMap'] = new Map<number, Message>([[12, favouritedMessage]]);
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
      const newMessage = new Message(new Date, true, "New Message", 12);
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
