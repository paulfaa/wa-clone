import { TestBed } from '@angular/core/testing';

import { MessageParsingService } from './message-parsing.service';

describe('MessageParsingService', () => {
  let service: MessageParsingService;

  beforeEach(() => {
    service = new MessageParsingService();
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parse()', () => {
    it('converts the provided text file to an array of message objects', () => {
        // Arrange
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
        expect(messages[0].isChatOwner).toBe(false);
      });
  });

});
