import { TestBed } from '@angular/core/testing';
import { FavouritesService } from './favourites.service';
import { MessageParsingService } from './message-parsing.service';
import { MessageService } from './message.service';
import { sampleMessage1, sampleMessage2 } from '../test/testMessages';

describe('MessageParsingService', () => {
  let service: MessageParsingService;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockFavouritesService: jasmine.SpyObj<FavouritesService>;

  const messageServiceSpy = jasmine.createSpyObj('mockMessageService', ['addMessages', '$getMessages']);
  const favouritesServiceSpy = jasmine.createSpyObj('mockFavouritesService', ['isFavourite']);

  const newJsonString = `
      {
            "key": "userkey",
            "contactName": "Test",
            "messages": [
                  {
                      "timestamp": "2019-10-05T00:00:00Z",
                      "id": "e0f89ae3-e5ee-4611-b65b-00a8abfec642",
                      "fromMe": true,
                      "type": "text",
                      "text": "Message contents..."
                  },
                  {
                      "timestamp": "2020-03-12T00:00:00Z",
                      "id": "2e419da2-a369-4915-8a78-3e76eecb714e",
                      "fromMe": true,
                      "type": "text",
                      "text": "Lorum Ipsum"
                  }
              ]
      }
  `;

  beforeEach(() => {
    service = new MessageParsingService(messageServiceSpy, favouritesServiceSpy);
    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    });
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

  describe('parseJson()', () => {
    it('throws an error if the json is invalid', () => {
      //Arrange
      const invalidJsonString: string = '{ "badData": }';

      //Assert
      expect(() => service.parseJsonString(invalidJsonString)).toThrowError(SyntaxError);
      expect(messageServiceSpy.addMessages.calls.count()).toBe(0);
      expect(messageServiceSpy.addMessages).not.toHaveBeenCalled();
    });
    
    it('Supports old json fomat', () => {
      //Arrange
      const yearMonthMap = service['yearMonthMap'];
      const expectedMapContentsFor2019 = new Set<number>([10]);
      const input =  ` 
        {
      "chats": [
          {
              "key": "userkey",
              "contactName": "Test",
              "messages": [
                  {
                      "id": "e0f89ae3-e5ee-4611-b65b-00a8abfec642",
                      "timestamp": "2019-10-05T00:00:00Z",
                      "fromMe": true,
                      "type": "text",
                      "text": "Message contents..."
                  },
                  {
                      "id": "2e419da2-a369-4915-8a78-3e76eecb714e",
                      "timestamp": "2020-03-12T00:00:00Z",
                      "fromMe": true,
                      "type": "text",
                      "text": "Lorum Ipsum"
                  }
              ]
          }
      ]
  }`;
      const expectedArg = new Map([
        ["2019-9", [jasmine.objectContaining(sampleMessage1)]],
        ["2020-2", [jasmine.objectContaining(sampleMessage2)]],
      ]);

      //Act
      service.parseJsonString(input);
      const generatedKeys = Array.from(yearMonthMap.keys());

      //Assert
      expect(messageServiceSpy.addMessages).toHaveBeenCalledWith(expectedArg);
      expect(generatedKeys.includes(2019)).toBeTrue();
      expect(generatedKeys.includes(2020)).toBeTrue();
      expect(yearMonthMap.get(2019)).toEqual(expectedMapContentsFor2019);
    });

    it('Supports new json format', () => {
      //Arrange
      const quotes = service['quoteIdsMap'];
      expect(quotes.size).toBe(0);
      //const expectedQuotes = new Set<string>();
      //const expectedQuotes = new Set<string>(["e0f89ae3-e5ee-4611-b65b-00a8abfec642","2e419da2-a369-4915-8a78-3e76eecb714e"]);
      const expectedArg = new Map([
        ["2019-9", [jasmine.objectContaining(sampleMessage1)]],
        ["2020-2", [jasmine.objectContaining(sampleMessage2)]]
      ]);

      //Act
      service.parseJsonString(newJsonString);

      //Assert
      expect(messageServiceSpy.addMessages).toHaveBeenCalledWith(expectedArg);
      //expect(quotes).toEqual(expectedQuotes);
    });
  }); 

  it('populates a yearMonthMap corresponding to the parsed messages', () => {
    //Arrange
    const expectedMap = new Map<number, Set<number>>();
    expectedMap.set(2019, new Set([10]))
    expectedMap.set(2020, new Set([3]))
    const serviceMap = service['yearMonthMap'];
    expect(serviceMap.size).toBe(0)

    //Act
    service.parseJsonString(newJsonString);

    //Assert
    expect(serviceMap).toEqual(expectedMap);
  });
});