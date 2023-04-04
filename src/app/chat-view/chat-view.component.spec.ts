import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';
import { MessageService } from '../services/message.service';
import { ChatViewComponent } from './chat-view.component';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockMessageParsingService: MessageParsingService;
  let mockMessages: Message[];

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['$getMessages']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatViewComponent ],
      providers: [{ provide: MessageService, useValue: mockMessageService }]
    })
    .compileComponents();

    mockMessages = [];
    mockMessages.push(new Message(new Date(2020, 10, 12), true, "Message contents...."));
    mockMessages.push(new Message(new Date(2020, 10, 12), true, "Lorum Ipsum"));
    mockMessages.push(new Message(new Date(2020, 10, 12), false, "Hello world..."));
    mockMessages.push(new Message(new Date(2020, 10, 12), true, "Message contents 2 ...."));
    mockMessageService.$getMessages.and.returnValue(of(mockMessages));

    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    component.messages = [];
    component.yearMap = new Map();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addMessage', () => {
    it('creates a new array if one does not already exist for specified year', () => {
      //arrange
      const m1 = new Message(new Date(2020, 10, 12), true, "Message contents....");
      const m2 = new Message(new Date(2021, 10, 12), true, "Lorum Ipsum");
      const m3 =new Message(new Date(2022, 10, 12), false, "Hello world...");

      //act
      component.addMessage(m1);
      component.addMessage(m2);
      component.addMessage(m3);

      //assert
      expect(component.yearMap.size).toEqual(3);
      expect(component.yearMap.has(2020)).toBeTrue();
      expect(component.yearMap.has(2021)).toBeTrue();
      expect(component.yearMap.get(2021)![0]).toEqual(m2);
    });
    it('appends messages to specified year if array already exists', () => {
      //arrange
      const m1 = new Message(new Date(2020, 10, 12), true, "Message contents....");
      const m2 = new Message(new Date(2020, 10, 13), true, "Lorum Ipsum");
      const m3 =new Message(new Date(2020, 10, 14), false, "Hello world...");
      const m4 =new Message(new Date(2020, 10, 15), false, "Lorum lorum..");

      //act
      component.addMessage(m1);
      component.addMessage(m2);
      component.addMessage(m3);
      component.addMessage(m4);

      //assert
      expect(component.yearMap.size).toEqual(1);
      expect(component.yearMap.get(2020)!.length).toBe(4);
      expect(component.yearMap.get(2020)![3]).toEqual(m4);
    });
  });

  /* describe('getMessagesForSelectedYear', () => {
    it('returns array containing all messages for the specified year', () => {
      //arrange
      component.setSelectedYear(2020);
      component.messages = mockMessages;
      const message2022 = new Message(new Date(2022, 10, 12), false, "Hello world...");
      component.messages.push(message2022);

      //act
      const actualResult = component.getMessagesForSelectedYear();

      //assert
      expect(actualResult).toBe(mockMessages);
      expect(actualResult.includes(message2022)).toBe(false);
    });
  }); */

  describe('page', () => {
    it('displays the message objects contained in the array', () => {
        // Arrange
        component.messages = mockMessages;

        // Act
        const messageCount = fixture.debugElement.queryAll(By.css('app-message')).length;
        const messageCount1 = fixture.debugElement.queryAll(By.css('.messageBubble')).length;

        // Assert
        expect(messageCount1).toEqual(4);
        
    });

    it('applies CSS correctly based on isChatOwner variable', () => {
      // Arrange
      component.messages = mockMessages;

      // Act
      const ownMessage = fixture.debugElement.query(By.css('.ownMessage'));

      // Assert
      expect(ownMessage).toBeTruthy();
    });
  });
});
