import { TestBed } from '@angular/core/testing';
import { Message } from '../models/message';
import StorageUtils from '../util/storage-util';

import { FavouritesService } from './favourites.service';

describe('FavouritesService', () => {
  let service: FavouritesService;
  const sampleMessage = new Message(new Date(), true, "Hello");

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });
  afterEach(() => {
    service['favouritesMap'] = new Map<number, Message>();
    service.clearFavourites();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initStorage()', () => {
    it('does not try to read storage if fileName is not defined', () => {
      // Arrange
      const invalidName = "";
      const storageSpy = spyOn(StorageUtils, 'readFromStorage');

      // Act
      service.initStorage(invalidName);

      // Assert
      expect(storageSpy).not.toHaveBeenCalled();
    });
    it('tries to read from storage if fileName is defined', () => {
      // Arrange
      const validName = "myFile.json";
      const storageSpy = spyOn(StorageUtils, 'readFromStorage');

      // Act
      service.initStorage(validName)

      // Assert
      expect(storageSpy).toHaveBeenCalledWith(validName + '.favourites');
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
      var favouritesMap = service['favouritesMap'];
      expect(favouritesMap.size).toEqual(0);

      // Act
      service.addToFavourites(1, sampleMessage);

      // Assert
      expect(favouritesMap.size).toEqual(1);
      expect(favouritesMap.get(1)).toEqual(sampleMessage);
    });
  });

  describe('removeFromFavourites()', () => {
    it('removes the specified message from the list', () => {
      // Arrange
      service.addToFavourites(1, sampleMessage);
      var len = service['favouritesMap'].size;
      expect(len).toEqual(1);

      // Act
      service.removeFromFavourites(1);
      var favourites = service.getFavourites();

      // Assert
      expect(favourites.size).toEqual(0);
      expect(favourites.has(1)).toBeFalse;
    });
    it('does not remove the specified message if it is not in favourites', () => {
      // Arrange
      const otherMessage = new Message(new Date, true, "Hey");
      service.addToFavourites(1, sampleMessage);
      const len = service['favouritesMap'].size;
      expect(len).toEqual(1);

      // Act
      service.removeFromFavourites(2);
      var favourites = service.getFavourites();

      // Assert
      expect(favourites.size).toEqual(1);
      expect(favourites.has(1)).toBeTrue;
    });
  });

  describe('getFavourites()', () => {
    it('returns empty list when no messages favourited', () => {
      // Act
      expect
      var favourites = service.getFavourites();

      // Assert
      expect(favourites.size).toEqual(0);
    });
    it('returns all messages which are favourited', () => {
      // Arrange
      service.addToFavourites(1, sampleMessage);
      service.addToFavourites(2, sampleMessage);
      service.addToFavourites(3, sampleMessage);

      // Act
      var favourites = service.getFavourites();

      // Assert 
      expect(favourites.size).toEqual(3);
      expect(favourites.has(1)).toBe(true);
    });
  });

  describe('clearFavourites()', () => {
    it('removes all favourites', () => {
      // Arrange
      service.addToFavourites(1, sampleMessage);
      var favourites = service['favouritesMap'];
      expect(favourites.size).toEqual(1);

      // Act
      service.clearFavourites();
      const newSize = service['favouritesMap'].size;

      // Assert
      expect(newSize).toEqual(0);
    });
  });
});
