import { TestBed } from '@angular/core/testing'

import { FavouritesService } from './favourites.service'
import { WhatsappMessage } from '../models/models'
import {
    sampleMessage1,
    sampleMessage2,
    sampleMessage3,
    sampleMessage4,
} from '../test/testMessages'
import DateUtils from '../util/date-util'
import { StorageService } from './storage.service'

describe('FavouritesService', () => {
    let service: FavouritesService
    let storageService: jasmine.SpyObj<StorageService>

    const message1 = sampleMessage1
    const message1Id = message1.id
    const message1YearMonth = DateUtils.createYearMonth(2019, 10)
    const message2 = sampleMessage2
    const yearDateMap = new Map<string, Map<string, WhatsappMessage>>([
        [
            '2019-10',
            new Map<string, WhatsappMessage>([['msg-id', sampleMessage1]]),
        ],
    ])

    const mockStorageService = jasmine.createSpyObj('storageService', [
        'readFavouritesMapFromStorage',
        'writeFavouritesMapToStorage',
    ])

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: StorageService,
                    useValue: mockStorageService,
                },
            ],
        })
        service = TestBed.inject(FavouritesService)
    })
    afterEach(() => {
        service['favouritesMap'] = new Map<
            string,
            Map<string, WhatsappMessage>
        >()
        service['areFavouritesModified'] = false
        mockStorageService.readFavouritesMapFromStorage.calls.reset()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    describe('initStorage()', () => {
        it('does not try to read favourites from storage if fileName is not defined', () => {
            // Arrange
            const invalidName = ''

            // Act
            service.initStorage(invalidName)

            // Assert
            expect(service['favouritesMap'].size).toBe(0)
            expect(
                mockStorageService.readFavouritesMapFromStorage
            ).not.toHaveBeenCalled()
        })

        it('loads favourites from storage if fileName is defined and saved data exists', () => {
            // Arrange
            expect(service['favouritesMap'].size).toBe(0)
            const validName = 'myFile.json'
            mockStorageService.readFavouritesMapFromStorage.and.returnValue(
                yearDateMap
            )

            // Act
            service.initStorage(validName)

            // Assert
            expect(
                mockStorageService.readFavouritesMapFromStorage
            ).toHaveBeenCalled()
            expect(service['favouritesMap'].size).toBe(1)
        })
    })

    describe('addToFavourites()', () => {
        it('adds the specified message to the list', () => {
            // Arrange
            const favouritesMap = service['favouritesMap']

            expect(favouritesMap.size).toEqual(0)

            // Act
            service.addToFavourites(message1)

            // Assert
            expect(favouritesMap.size).toEqual(1)
            expect(
                favouritesMap
                    .get(DateUtils.yearMonthToString(message1YearMonth))!
                    .get(message1Id)
            ).toEqual(message1)
        })
    })

    describe('removeFromFavourites()', () => {
        it('removes the specified message from the list', () => {
            // Arrange
            service.addToFavourites(message1)
            service.addToFavourites(message2)
            const len = service['favouritesMap'].size
            expect(len).toEqual(2)

            // Act
            service.removeFromFavourites(message1)
            const favouritesOct2019 =
                service.getFavouritedIds(message1YearMonth)
            const newLen = service['favouritesMap'].size

            // Assert
            expect(newLen).toBe(1)
            expect(favouritesOct2019).toEqual(new Set())
        })

        it('does not remove the specified message if it is not in favourites', () => {
            // Arrange
            const invalidId = 'does-not-exist'
            service.addToFavourites(message1)
            const len = service['favouritesMap'].size
            expect(len).toEqual(1)

            // Act
            service.removeFromFavourites(message2)
            const favourites = service.getFavouritedIds(message1YearMonth)

            // Assert
            expect(favourites!.size).toEqual(1)
            expect(favourites!.has(message1Id)).toBeTrue
            expect(favourites!.has(invalidId)).toBeFalse
        })

        it('also removes the yearDate key if the message deleted was the last in that map', () => {
            // Arrange
            service.addToFavourites(message1)
            const len = service['favouritesMap'].size
            expect(len).toEqual(1)

            // Act
            service.removeFromFavourites(message1)
            const favourites = service.getFavouritedIds(message1YearMonth)

            // Assert
            expect(favourites).toEqual(new Set())
            //expect(favourites!.size).toEqual(0);
            expect(service['favouritesMap'].get('2019-09')).toBe(undefined)
        })
    })

    describe('getFavourites()', () => {
        it('returns an empty set when no messages favourited', () => {
            // Arrange
            const keyWithNoValues = DateUtils.createYearMonth(2000, 1)

            // Act
            const favourites = service.getFavouritedIds(keyWithNoValues)

            // Assert
            expect(favourites).toEqual(new Set())
        })
        it('returns all messages which are favourited for the corresponding yearMonth', () => {
            // Arrange
            service.addToFavourites(message1)
            service.addToFavourites(sampleMessage3)
            service.addToFavourites(sampleMessage4)

            // Act
            const favourites = service.getFavouritedIds(message1YearMonth)

            // Assert
            expect(favourites!.size).toEqual(1)
            expect(favourites!.has(message1Id)).toBe(true)
        })
    })

    describe('clearFavourites()', () => {
        it('removes all favourites', () => {
            // Arrange
            service.addToFavourites(message1)
            const favourites = service['favouritesMap']
            expect(favourites.size).toEqual(1)

            // Act
            service.clearFavourites()
            const newSize = service['favouritesMap'].size

            // Assert
            expect(newSize).toEqual(0)
        })
    })

    describe('getAllFavourites()', () => {
        it('returns an array of all favourites ordered by date ascending', () => {
            // Arrange
            service['favouritesMap'] = new Map<
                string,
                Map<string, WhatsappMessage>
            >([
                [
                    '2020-3',
                    new Map<string, WhatsappMessage>([['msg-id1', message2]]),
                ],
                [
                    '2019-10',
                    new Map<string, WhatsappMessage>([['msg-id2', message1]]),
                ],
            ])

            // Act
            const result = service.getAllFavourites()

            // Assert
            expect(result.length).toBe(2)
            expect(result[0]).toEqual(message1)
        })
    })
})
