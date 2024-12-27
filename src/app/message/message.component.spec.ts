import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritesService } from '../services/favourites.service';
import { MessageComponent } from './message.component';
import { sampleMessage1, sampleMessage2 } from '../test/testMessages';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let mockFavouritesService: jasmine.SpyObj<FavouritesService>;

  mockFavouritesService = jasmine.createSpyObj('mockFavouritesService', ['isFavourite']);
  const sampleMessage = sampleMessage1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [ { provide: FavouritesService, useValue: mockFavouritesService } ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.messageInput = sampleMessage;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleFavourite()', () => {
    const message = sampleMessage2;
    beforeEach(() => {
      component.messageInput = message;
    });
    it('sets isFavourite to false if this message is already favourited, and emits an event', () => {
      // Arrange
      spyOn(component.toggleFavouriteEvent, 'emit');
      component.isFavourite = true;

      // Act
      component.toggleFavourite();

      // Assert
      expect(component.isFavourite).toBeFalse;
      expect(component.toggleFavouriteEvent.emit).toHaveBeenCalledWith(message);

     });
     it('sets isFavourite to true if message was not favourited, and emits an event', () => {
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
