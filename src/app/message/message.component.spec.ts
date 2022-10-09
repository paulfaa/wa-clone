import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Message } from '../models/message';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  const message = new Message(new Date(), "Me", "Good morning", true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [ Message ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
