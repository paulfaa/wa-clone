import { WhatsappMessage, YearMonth } from '../models/models'

export default class DateUtils {
    static getFirstYearMonthFromMap(
        yearMonthMap: Map<number, Set<number>>
    ): YearMonth {
        const keysArray = Array.from(yearMonthMap.keys())
        const firstYear = Math.min(...keysArray)
        const monthSet = yearMonthMap.get(firstYear)!
        const monthArray = Array.from(monthSet)
        const firstMonth = Math.min(...monthArray)
        return { year: firstYear, month: firstMonth }
    }

    static createYearMonth(year: number, month: number): YearMonth {
        return { year, month }
    }

    static generateYearMonthKey(date: Date): string {
        const year = date.getFullYear()
        const month = this.getActualMonth(date)
        return `${year}-${month}`
    }

    static yearMonthToString(yearMonth: YearMonth): string {
        return `${yearMonth.year}-${yearMonth.month}`
    }

    static generateYearMonthFromKey(yearMonthKey: string): YearMonth {
        const parts = yearMonthKey.split('-')
        const year = Number(parts[0])
        const month = Number(parts[1])
        return DateUtils.createYearMonth(year, month)
    }

    static messageToYearMonthString(msg: WhatsappMessage): string {
        return this.generateYearMonthKey(new Date(msg.timestamp))
    }

    static getActualMonth(date: Date) {
        return date.getMonth() + 1
    }
}
