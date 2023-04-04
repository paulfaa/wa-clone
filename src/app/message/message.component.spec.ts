import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Message } from '../models/message';
import { FavouritesService } from '../services/favourites.service';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let mockFavouritesService: jasmine.SpyObj<FavouritesService>;

  mockFavouritesService = jasmine.createSpyObj('mockFavouritesService', ['isFavourite']);
  const sampleMessage = new Message(new Date(), true, "Good morning");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [ { Message, provide: FavouritesService, useValue: mockFavouritesService } ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.text = sampleMessage.text;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
