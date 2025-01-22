import DateUtils from './date-util'

describe('DateUtils', () => {
    const testDatesMap = new Map<number, Set<number>>()
    testDatesMap.set(2020, new Set<number>([1, 2, 3, 6, 11]))
    testDatesMap.set(2021, new Set<number>([3, 4, 9]))

    describe('getFirstYearMonthFromMap', () => {
        it('returns the earliest yearMonth of a given map', () => {
            const expectedDate = DateUtils.createYearMonth(2020, 1)

            const result = DateUtils.getFirstYearMonthFromMap(testDatesMap)

            expect(result).toEqual(expectedDate)
        })
    })

    describe('createYearMonthFromTimestamp', () => {
        it('returns a yearMonth object corresponding to the provided timestamp', () => {
            //Arrange
            const timestamp = '2020-05-14T09:20:00Z'
            const expectedDate = DateUtils.createYearMonth(2020, 5)

            //Act
            const result = DateUtils.createYearMonthFromTimestamp(timestamp)

            //Assert
            expect(result).toEqual(expectedDate)
        })

        it('throws an error if the timestamp is invalid', () => {
            //Arrange
            const timestamp = 'not a timestamp'

            //Act
            expect(() =>
                DateUtils.createYearMonthFromTimestamp(timestamp)
            ).toThrowError('Invalid timestamp: ' + timestamp)
        })
    })
})
