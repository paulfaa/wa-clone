import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'fs';
import { Message } from '../models/message';
import { FavouritesService } from './favourites.service';
import { MessageParsingService } from './message-parsing.service';
import { MessageService } from './message.service';

describe('MessageParsingService', () => {
  let service: MessageParsingService;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockFavouritesService: jasmine.SpyObj<FavouritesService>;

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['addMessage', '$getMessages']);
  mockFavouritesService = jasmine.createSpyObj('mockFavouritesService', ['isFavourite']);
  //mockMessageService.$getMessages.and.returnValue(null);

  //const messageServiceSpy = jasmine.createSpyObj('MessageService', ['addMessage']);
  const validJson: any = require('../../assets/test.json');

  beforeEach(() => {
    service = new MessageParsingService(mockMessageService, mockFavouritesService);
    service['messages'] = [];
    TestBed.configureTestingModule({providers: [MessageService]});
    service = TestBed.inject(MessageParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllChatMembers()', () => {
    it('Returns a list of all members in the chat', () => {
      //Arrange
      const names = [
        "Person1",
        "Person2",
        "Person1"
      ]

      //Act
      const result = service.getAllChatMembers(names);
      const isGroupChat = service.isGroupChat;

      //Assert
      expect(isGroupChat).toBe(false);
      expect(result.length).toBe(2);
      expect(result[0]).toEqual("Person1");
      expect(result[1]).toEqual("Person2");
    });
    it('Sets isGroupChat to true if 3 or more members', () => {
      //Arrange
      const names = [
        "Person1",
        "Person2",
        "Person3"
      ]

      //Act
      const result = service.getAllChatMembers(names);
      const isGroupChat = service.isGroupChat;     

      //Assert
      expect(result.length).toBe(3);
      expect(isGroupChat).toBe(true);
    });
  });

  describe('parse()', () => {
    it('converts the provided text file to an array of message objects', () => {
      // Arrange
      service['chatOwner'] = "User1";
      const testFile = "[10/10/22, 11:11:11] User1: Hello";
      var expectedDate = new Date('2022-10-10');
      expectedDate.setHours(11);
      expectedDate.setMinutes(11);
      expectedDate.setSeconds(11);

      // Act
      service.parseText(testFile);
      const messages = service.getAllMessages();

      // Assert
      expect(messages).not.toBeNull();
      expect(messages[0].text).toEqual("Hello");
      console.log("Expected" + expectedDate)
      expect(messages[0].timestamp).toEqual(expectedDate);
      expect(messages[0].fromMe).toBe(true);
    });

    it('sets isChatOwner correctly', () => {
      // Arrange
      service['chatOwner'] = "Joe";
      const testFile = "[10/10/22, 11:11:11] User1: Hello";
      var expectedDate = new Date('2022-10-10');
      expectedDate.setTime(9999);

      // Act
      service.parseText(testFile);
      const messages = service.getAllMessages();

      // Assert
      expect(messages).not.toBeNull();
      expect(messages[0].fromMe).toBe(false);
    });

    /* it('can parse multiline files', () => {
      // Arrange
      const testFile =
      `[10/10/22, 11:11:11] User1: Hello \n
      [10/10/22, 11:11:12] User2: Hi \n
      [10/10/22, 11:11:13] User1: This is a loooooooooooooooooooooooong message \n
      [10/10/22, 11:11:14] User2: Ok there there there there there is a \n
      [10/10/22, 11:11:15] User1: Lorem Ipsum`

      // Act
      service.parseText(testFile);
      const messages = service.getAllMessages();

      // Assert
      expect(messages).not.toBeNull();
      expect(messages.length).toEqual(5);
    }); */
  });

  describe('parseOldFormat()', () => {
    it('converts the provided text file to an array of message objects', () => {
      // Arrange
      service['chatOwner'] = "he";
      const testFile = "2015.12.30 - 16:44:20; he: Ja ich weiss";
      var expectedDate = new Date('2015-12-30');
      expectedDate.setHours(16);
      expectedDate.setMinutes(44);
      expectedDate.setSeconds(20);

      // Act
      service.parseText(testFile);
      const messages = service.getAllMessages();

      // Assert
      expect(messages).not.toBeNull();
      expect(messages[0].text).toEqual("Ja ich weiss");
      console.log("Actualdate : " + messages[0].timestamp)
      console.log("Expecteddate : " + expectedDate)
      expect(messages[0].timestamp).toEqual(expectedDate);
      expect(messages[0].fromMe).toBe(true);
    });
  });  

  describe('parseJson()', () => {
    it('converts the provided json file to an array of message objects', () => {
      //Arrange

      //Act
      console.log("test ", validJson);
      //service.parseJson(validJson);

      //Assert
      //expect(mockMessageService.addMessage(jasmine.any(Message))).toHaveBeenCalledTimes(3);
    });
  }); 
});