import { YearMonth } from "../models/models";

export default class DateUtils {
    static getFirstYearMonthFromMap(yearMonthMap : Map<number, Set<number>>): YearMonth{
        const keysArray = Array.from(yearMonthMap.keys())
        const firstYear = Math.min(...keysArray)
        const monthSet = yearMonthMap.get(firstYear)!;
        const monthArray = Array.from(monthSet);
        const firstMonth = Math.min(...monthArray) - 1;
        return {year: firstYear, month: firstMonth};
    }

    static createYearMonth(year: number, month: number){
        return { year, month }; 
    }

    static generateYearMonthKey(date: Date): string{
        return `${date.getFullYear()}-${date.getMonth()}`;
    }

    static yearMonthToString(yearMonth: YearMonth): string {
        return `${yearMonth.year}-${yearMonth.month}`;
    }

    static generateYearMonthFromKey(yearMonthKey: string): YearMonth {
        const parts = yearMonthKey.split('-');
        const year = Number(parts[0]);
        const month = Number(parts[1]);
        return DateUtils.createYearMonth(year, month);
    }
}