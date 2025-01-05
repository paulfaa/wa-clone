import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { MessageParsingService } from '../services/message-parsing.service'
import { YearMonth } from '../models/models'
import DateUtils from '../util/date-util'
import { StorageService } from '../services/storage.service'

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
    @Output() yearMonthSelectEvent: EventEmitter<YearMonth> = new EventEmitter()
    //@Output() mapCreatedEvent: EventEmitter<Date> = new EventEmitter();

    protected yearMonthMap: Map<number, Set<number>>
    private selectedYear: number | undefined
    private selectedMonth: number | undefined
    private fileName: string | undefined

    constructor(
        private messageParsingService: MessageParsingService,
        private storageService: StorageService
    ) {
        this.yearMonthMap = this.messageParsingService.getYearMonthMap()
        this.fileName = this.storageService.getFileName()
    }

    ngOnInit(): void {
        this.selectYearMonth()
        //is loading first element of map for some reason
        this.yearMonthSelectEvent.emit(
            DateUtils.createYearMonth(this.selectedYear!, this.selectedMonth!)
        )
    }

    public onYearSelected(tabChangeEvent: MatTabChangeEvent): void {
        this.selectedYear = Number(tabChangeEvent.tab.textLabel)
        this.selectedMonth = this.getFirstMonth(this.selectedYear)
        console.warn('Selected year tab: ' + this.selectedYear)
        console.warn('First month for selected year: ' + this.selectedMonth)
        const selectedYearMonth = DateUtils.createYearMonth(
            this.selectedYear,
            this.selectedMonth
        )
        this.yearMonthSelectEvent.emit(selectedYearMonth)
        console.debug(tabChangeEvent.tab.textLabel)
        this.storageService.writeLastViewedYearMonthToStorage(selectedYearMonth)
    }

    public onMonthSelected(tabChangeEvent: MatTabChangeEvent): void {
        this.selectedMonth = DateUtils.getActualMonth(
            new Date(Date.parse(tabChangeEvent.tab.textLabel + ' 1, 2000'))
        )
        const selectedYearMonth = DateUtils.createYearMonth(
            this.selectedYear!,
            this.selectedMonth
        )
        this.yearMonthSelectEvent.emit(selectedYearMonth)
        console.debug(tabChangeEvent.tab.textLabel)
        this.storageService.writeLastViewedYearMonthToStorage(selectedYearMonth)
    }

    private selectYearMonth(): void {
        if (this.fileName) {
            const storedYearMonth =
                this.storageService.readLastViewedYearMonthFromStorage()
            this.selectedYear = storedYearMonth?.year
            this.selectedMonth = storedYearMonth?.month
        } else {
            const [firstKey] = this.yearMonthMap.keys()
            this.selectedYear = firstKey
            this.selectedMonth = this.getFirstMonth(this.selectedYear)
        }
    }

    private getFirstMonth(year: number): number {
        const monthSet = this.yearMonthMap.get(year)!
        const monthArray = Array.from(monthSet)
        return Math.min(...monthArray)
    }
}
