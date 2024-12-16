export default class DateUtils {
    static getFirstMonthForYear(year: number, yearMonthMap : Map<number, Set<number>>): Date{
        const monthSet = yearMonthMap.get(year)!;
        const monthArray = Array.from(monthSet);
        const firstMonth = Math.min(...monthArray);
        return new Date(year, firstMonth, 1);
    }

    static getFirstDateFromMap(yearMonthMap : Map<number, Set<number>>): Date{
        const [firstYear] = yearMonthMap.keys();
        const monthSet = yearMonthMap.get(firstYear)!;
        const monthArray = Array.from(monthSet);
        const firstMonth = Math.min(...monthArray);
        return new Date(firstYear, firstMonth, 1);
    }
}