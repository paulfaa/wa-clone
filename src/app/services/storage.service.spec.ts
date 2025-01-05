import { TestBed } from '@angular/core/testing'

import { StorageService } from './storage.service'
import { YearMonth } from '../models/models'

describe('StorageService', () => {
    let service: StorageService
    const mockFilename = 'UNIT_TEST'
    const key = mockFilename + '.lastSelectedYearMonth'
    const testDate: YearMonth = { year: 2023, month: 11 }

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(StorageService)
        service['fileName'] = mockFilename
        localStorage.clear()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    describe('readLastViewedYearMonthFromStorage()', () => {
        it('should return YearMonth object if data exists in localStorage', () => {
            // Arrange
            localStorage.setItem(key, JSON.stringify(testDate))

            // Act
            const result = service.readLastViewedYearMonthFromStorage()

            // Assert
            expect(result).toEqual(testDate)
        })

        it('should return undefined if no data exists for the key', () => {
            // Act
            const invalidKey = 'bad'
            const result = service.readLastViewedYearMonthFromStorage()

            // Assert
            expect(result).toEqual(undefined)
        })

        it('should return undefined and log an error if stored data is invalid JSON', () => {
            // Arrange
            const consoleLogSpy = spyOn(console, 'log')
            localStorage.setItem(key, 'invalid-json')

            // Act
            const result = service.readLastViewedYearMonthFromStorage()

            // Assert
            expect(result).toBeUndefined()
            expect(consoleLogSpy).toHaveBeenCalledWith(
                jasmine.stringMatching(
                    `Error parsing stored data for key ${key}:`
                ),
                jasmine.any(Error)
            )
        })
    })

    describe('writeLastViewedYearMonthToStorage()', () => {
        it('should store YearMonth object as a JSON string in localStorage', () => {
            // Act
            service.writeLastViewedYearMonthToStorage(testDate)

            // Assert
            const storedData = localStorage.getItem(key)
            expect(storedData).toBe(JSON.stringify(testDate))
        })
    })
})
