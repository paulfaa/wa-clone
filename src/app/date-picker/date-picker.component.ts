import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { MessageParsingService } from '../services/message-parsing.service'
import { YearMonth } from '../models/models'
import DateUtils from '../util/date-util'
import { StorageService } from '../services/storage.service'

interface TabIndexes {
    selectedYearIndex: number
    selectedMonthIndex: number
}

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
    @Output() yearMonthSelectEvent: EventEmitter<YearMonth> = new EventEmitter()
    //@Output() mapCreatedEvent: EventEmitter<Date> = new EventEmitter();

    protected yearMonthMap: Map<number, Set<number>>

    public selectedYearIndex: number = 0
    public selectedMonthIndex: number = 0

    constructor(
        private messageParsingService: MessageParsingService,
        private storageService: StorageService
    ) {
        this.yearMonthMap = this.messageParsingService.getYearMonthMap()
    }

    ngOnInit(): void {
        const lastViewedYearMonth =
            this.storageService.readLastViewedYearMonthFromStorage()
        if (lastViewedYearMonth) {
            const indexes = this.getTabIndexOfYearMonth(lastViewedYearMonth)
            this.selectedYearIndex = indexes.selectedYearIndex
            this.selectedMonthIndex = indexes.selectedMonthIndex
        }
    }

    public onYearSelected(tabChangeEvent: MatTabChangeEvent): void {
        const selectedYear = Number(tabChangeEvent.tab.textLabel)
        const selectedMonth = this.getFirstMonth(selectedYear)
        const selectedYearMonth = DateUtils.createYearMonth(
            selectedYear,
            selectedMonth
        )
        this.yearMonthSelectEvent.emit(selectedYearMonth)
        console.debug('onYearSelected: ', tabChangeEvent.tab.textLabel)
        this.storageService.writeLastViewedYearMonthToStorage(selectedYearMonth)
    }

    public onMonthSelected(tabChangeEvent: MatTabChangeEvent): void {
        const selectedMonth = DateUtils.getActualMonth(
            new Date(Date.parse(tabChangeEvent.tab.textLabel + ' 1, 2000'))
        )
        //const selectedYear = get tab.textLabel of currently selected outer tab
        const selectedYearMonth = DateUtils.createYearMonth(2000, selectedMonth)
        this.yearMonthSelectEvent.emit(selectedYearMonth)
        console.debug('onMonthSelected: ', tabChangeEvent.tab.textLabel)
        this.storageService.writeLastViewedYearMonthToStorage(selectedYearMonth)
    }

    private getFirstMonth(year: number): number {
        const monthSet = this.yearMonthMap.get(year)!
        const monthArray = Array.from(monthSet)
        return Math.min(...monthArray)
    }

    private getTabIndexOfYearMonth(selected: YearMonth): TabIndexes {
        const years = Array.from(this.yearMonthMap.keys()).sort()
        const selectedYear = selected.year
        const yearIndex = years.indexOf(selectedYear)
        const months = Array.from(this.yearMonthMap.get(selectedYear)!).sort()
        const monthIndex = months.indexOf(selected.month)
        return { selectedYearIndex: yearIndex, selectedMonthIndex: monthIndex }
    }
}
