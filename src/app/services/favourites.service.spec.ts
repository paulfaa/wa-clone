import { TestBed } from '@angular/core/testing';
import { Message } from '../models/message';
import StorageUtils from '../util/storage-util';

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

  describe('initStorage()', () => {
    it('does not try to read storage if fileName is not defined', () => {
      // Arrange
      const invalidName = "";

      // Act
      service.initStorage(invalidName + '.favourites')

      // Assert
      expect(StorageUtils.readFromStorage(invalidName + '.favourites')).not.toHaveBeenCalled();
    });
    it('does not try to read storage if fileName is not defined', () => {
      // Arrange
      const validName = "myFile.json";

      // Act
      service.initStorage(validName + '.favourites')

      // Assert
      expect(StorageUtils.readFromStorage(validName + '.favourites')).toHaveBeenCalled();
    });
    it('loads data from storage if fileName matches', () => {
      // Arrange

      // Act

      // Assert
    });
  });

  describe('addToFavourites()', () => {
    it('adds the specified message to the list', () => {
      // Arrange
      var favourites = service['favourites'].length;
      expect(favourites).toEqual(0);

      // Act
      service.addToFavourites(message);
      var favourites = service.getFavourites().length;

      // Assert
      expect(favourites).toEqual(1);
    });
  });

  describe('removeFromFavourites()', () => {
    it('removes the specified message from the list', () => {
      // Arrange
      service.addToFavourites(message);
      var len = service['favourites'].length;
      expect(len).toEqual(1);

      // Act
      service.removeFromFavourites(message);
      var favourites = service.getFavourites();

      // Assert
      expect(favourites.length).toEqual(0);
      expect(favourites.includes(message)).toBeFalse;
    });
    it('does not remove the specified message if it is not in favourites', () => {
      // Arrange
      const otherMessage = new Message(new Date, true, "Hey");
      service.addToFavourites(message);
      const len = service['favourites'].length;
      expect(len).toEqual(1);

      // Act
      service.removeFromFavourites(otherMessage);
      var favourites = service.getFavourites();

      // Assert
      expect(favourites.length).toEqual(1);
      expect(favourites.includes(message)).toBeTrue;
    });
  });

  describe('getFavourites()', () => {
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
