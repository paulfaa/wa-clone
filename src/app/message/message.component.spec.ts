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

  describe('toggleFavourite()', () => {
    var message: Message = new Message(new Date(), true, "Hi")
    beforeEach(() => {
      component.timestamp = message.timestamp;
      component.text = message.text;
      component.fromMe = message.fromMe;
    });
    it('sets isFavourite to false if this is favourite, and emits an event', () => {
      // Arrange
      spyOn(component.toggleFavouriteEvent, 'emit');
      component.isFavourite = true;

      // Act
      component.toggleFavourite();

      // Assert
      expect(component.isFavourite).toBeFalse;
      expect(component.toggleFavouriteEvent.emit).toHaveBeenCalledWith(message);

     });
     it('sets isFavourite to true if this is not, and emits an event', () => {
      // Arrange
      spyOn(component.toggleFavouriteEvent, 'emit');
      component.isFavourite = false;

      // Act
      component.toggleFavourite();

      // Assert
      expect(component.isFavourite).toBeFalse;
      expect(component.toggleFavouriteEvent.emit).toHaveBeenCalledWith(message);
     });
  });
});
