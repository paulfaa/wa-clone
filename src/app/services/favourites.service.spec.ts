import { TestBed } from '@angular/core/testing';
import StorageUtils from '../util/storage-util';

import { FavouritesService } from './favourites.service';
import { WhatsappMessage } from '../models/models';
import { sampleMessage1, sampleMessage3, sampleMessage4 } from '../test/testMessages';

describe('FavouritesService', () => {
  let service: FavouritesService;
  const sampleMessage = sampleMessage1;
  const id = sampleMessage.id;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });
  afterEach(() => {
    service['favouritesMap'] = new Map<string, WhatsappMessage>();
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
      const favouritesMap = service['favouritesMap'];
      expect(favouritesMap.size).toEqual(0);

      // Act
      service.addToFavourites(sampleMessage);

      // Assert
      expect(favouritesMap.size).toEqual(1);
      expect(favouritesMap.get(id)).toEqual(sampleMessage);
    });
  });

  describe('removeFromFavourites()', () => {
    it('removes the specified message from the list', () => {
      // Arrange
      service.addToFavourites(sampleMessage);
      const len = service['favouritesMap'].size;
      expect(len).toEqual(1);

      // Act
      service.removeFromFavourites(id);
      const favourites = service.getFavourites();

      // Assert
      expect(favourites.size).toEqual(0);
      expect(favourites.has(id)).toBeFalse;
    });
    it('does not remove the specified message if it is not in favourites', () => {
      // Arrange
      const invalidId = "does-not-exist";
      service.addToFavourites(sampleMessage);
      const len = service['favouritesMap'].size;
      expect(len).toEqual(1);

      // Act
      service.removeFromFavourites(invalidId);
      const favourites = service.getFavourites();

      // Assert
      expect(favourites.size).toEqual(1);
      expect(favourites.has(id)).toBeTrue;
      expect(favourites.has(invalidId)).toBeFalse;
    });
  });

  describe('getFavourites()', () => {
    it('returns empty list when no messages favourited', () => {
      // Act
      const favourites = service.getFavourites();

      // Assert
      expect(favourites.size).toEqual(0);
    });
    it('returns all messages which are favourited', () => {
      // Arrange
      service.addToFavourites(sampleMessage);
      service.addToFavourites(sampleMessage3);
      service.addToFavourites(sampleMessage4);

      // Act
      const favourites = service.getFavourites();

      // Assert 
      expect(favourites.size).toEqual(3);
      expect(favourites.has(id)).toBe(true);
    });
  });

  describe('clearFavourites()', () => {
    it('removes all favourites', () => {
      // Arrange
      service.addToFavourites(sampleMessage);
      const favourites = service['favouritesMap'];
      expect(favourites.size).toEqual(1);

      // Act
      service.clearFavourites();
      const newSize = service['favouritesMap'].size;

      // Assert
      expect(newSize).toEqual(0);
    });
  });
});
