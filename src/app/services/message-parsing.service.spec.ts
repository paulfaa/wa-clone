import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'fs';
import { MessageParsingService } from './message-parsing.service';

describe('MessageParsingService', () => {
  let service: MessageParsingService;

  beforeEach(() => {
    service = new MessageParsingService();
    service['messages'] = [];
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
      service.parse(testFile);
      const messages = service.getAllMessages();

      // Assert
      expect(messages).not.toBeNull();
      expect(messages[0].messageContents).toEqual("Hello");
      expect(messages[0].author).toEqual("User1");
      console.log("Expected" + expectedDate)
      expect(messages[0].messageDate).toEqual(expectedDate);
      expect(messages[0].isChatOwner).toBe(true);
    });

    it('sets isChatOwner correctly', () => {
      // Arrange
      service['chatOwner'] = "Joe";
      const testFile = "[10/10/22, 11:11:11] User1: Hello";
      var expectedDate = new Date('2022-10-10');
      expectedDate.setTime(9999);

      // Act
      service.parse(testFile);
      const messages = service.getAllMessages();

      // Assert
      expect(messages).not.toBeNull();
      expect(messages[0].author).toEqual("User1");
      expect(messages[0].isChatOwner).toBe(false);
    });

    it('can parse multiline files', () => {
      // Arrange
      const testFile =
      `[10/10/22, 11:11:11] User1: Hello \n
      [10/10/22, 11:11:12] User2: Hi \n
      [10/10/22, 11:11:13] User1: This is a loooooooooooooooooooooooong message \n
      [10/10/22, 11:11:14] User2: Ok there there there there there is a \n
      [10/10/22, 11:11:15] User1: Lorem Ipsum`

      // Act
      service.parse(testFile);
      const messages = service.getAllMessages();

      // Assert
      expect(messages).not.toBeNull();
      expect(messages.length).toEqual(5);
    });
  });
});