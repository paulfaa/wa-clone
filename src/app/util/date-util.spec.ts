import DateUtils from "./date-util";

describe('DateUtils', () => {

    const testDatesMap = new Map<number, Set<number>>();
    testDatesMap.set(2020, new Set<number>([1,2,3,6,11]));
    testDatesMap.set(2021, new Set<number>([3,4,9]));

    describe('getFirstMonthForYear', () => {
        it('returns the earliest month of a given year', () => {
            const expectedDate = new Date(2021, 2);

            const result = DateUtils.getFirstMonthForYear(2021, testDatesMap);

            expect(result).toEqual(expectedDate);
        });
    });

    describe('getFirstDateFromMap', () => {
        it('returns the earliest date of a given map', () => {
            const expectedDate = new Date(2020, 0);

            const result = DateUtils.getFirstDateFromMap(testDatesMap);

            expect(result).toEqual(expectedDate);
        });
    });
});