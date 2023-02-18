import { TestBed } from '@angular/core/testing';
import { Message } from '../models/message';

import { FavouritesService } from './favourites.service';

describe('FavouritesService', () => {
  let service: FavouritesService;
  const message = new Message(new Date(), true, "Hello");

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });
  afterEach(() => {
    service['favourites'] = [];
    service.clearFavourites();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addCoin()', () => {
    it('adds the specified coin to the list', () => {
        // Arrange
        var coinsLength = service['favourites'].length;
        expect(coinsLength).toEqual(0);

        // Act
        service.addToFavourites(message);
        var coinsLength = service.getFavourites().length;

        // Assert
        expect(coinsLength).toEqual(1);
    });
  });

  describe('getAllUniqueTickers()', () => {
    it('returns empty list when no messages favourited', () => {
        // Act
        expect
        var favourites = service.getFavourites();

        // Assert
        expect(favourites.length).toEqual(0);
    });
    it('returns the amount of messages favourited', () => {
        // Arrange
        service.addToFavourites(message);
        service.addToFavourites(message);
        service.addToFavourites(message);

        // Act
        var favourites = service.getFavourites();

        // Assert 
        expect(favourites.length).toEqual(3);
        expect(favourites.includes(message)).toBe(true);
    });
  });

  describe('clearFavourites()', () => {
    it('removes all favourites', () => {
        // Arrange
        service.addToFavourites(message);
        var favourites = service['favourites'].length;
        expect(favourites).toEqual(1);

        // Act
        service.clearFavourites();
        favourites = service['favourites'].length;

        // Assert
        expect(favourites).toEqual(0);
    }); 
  });
});
