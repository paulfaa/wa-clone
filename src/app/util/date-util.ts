export default class DateUtils {
    static getFirstMonthForYear(year: number, yearMonthMap : Map<number, Set<number>>): Date{
        const monthSet = yearMonthMap.get(year)!;
        const monthArray = Array.from(monthSet);
        const firstMonth = Math.min(...monthArray) - 1;
        return new Date(year, firstMonth, 1);
    }

    static getFirstDateFromMap(yearMonthMap : Map<number, Set<number>>): Date{
        const keysArray = Array.from(yearMonthMap.keys())
        const firstYear = Math.min(...keysArray)
        const monthSet = yearMonthMap.get(firstYear)!;
        const monthArray = Array.from(monthSet);
        const firstMonth = Math.min(...monthArray) - 1;
        return new Date(firstYear, firstMonth, 1);
    }
}