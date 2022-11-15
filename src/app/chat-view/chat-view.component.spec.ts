import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Message } from '../models/message';
import { MessageParsingService } from '../services/message-parsing.service';
import { ChatViewComponent } from './chat-view.component';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;
  let mockMessageParsingService: MessageParsingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatViewComponent ]
    })
    .compileComponents();

    var mockMessages: Message[] = [];
        mockMessages.push(new Message(new Date(), "User1", "Message contents....", true))
        mockMessages.push(new Message(new Date(), "User1", "Lorum Ipsum", true))
        mockMessages.push(new Message(new Date(), "User2", "Hello world...", false))
        mockMessages.push(new Message(new Date(), "User1", "Message contents 2 ....", true))

    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    component.messages = mockMessages;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page', () => {
    it('displays the message objects contained in the array', () => {
        // Arrange
        

        // Act
        const messageCount = fixture.debugElement.queryAll(By.css('app-message')).length;
        const messageCount1 = fixture.debugElement.queryAll(By.css('.messageBubble')).length;

        // Assert
        expect(messageCount1).toEqual(4);
        
    });

    it('applies CSS correctly based on isChatOwner variable', () => {
      // Arrange

      // Act
      const ownMessage = fixture.debugElement.query(By.css('.ownMessage'));

      // Assert
      expect(ownMessage).toBeTruthy();
    });
  });
});
