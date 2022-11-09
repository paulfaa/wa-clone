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

    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page', () => {
    it('displays the message objects contained in the array', () => {
        // Arrange
        var mockMessages: Message[] = [];
        mockMessages.push(new Message(moment.now(), "User1", "Message contents....", true))
        mockMessages.push(new Message(moment.now(), "User1", "Lorum Ipsum", true))
        mockMessages.push(new Message(moment.now(), "User2", "Hello world...", false))
        mockMessages.push(new Message(moment.now(), "User1", "Message contents 2 ....", true))

        // Act
        const messageCount = fixture.debugElement.queryAll(By.css("<app-message>")).length;

        // Assert
        expect(messageCount).toEqual(4);
        
    });

    it('applies CSS correctly based on isChatOwner variable', () => {
      // Arrange

      // Act
      const message = fixture.debugElement.query(By.css("<app-message>"));
      const ownMessage = message.query(By.css(".ownMessage"))

      // Assert
      expect(ownMessage).toBeTruthy();
    });
  });
});
