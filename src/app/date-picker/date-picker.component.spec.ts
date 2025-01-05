import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { DatePickerComponent } from './date-picker.component'
import { MonthPipe } from './month.pipe'
import { SetToArrayPipe } from './set-to-array.pipe'
import { By } from '@angular/platform-browser'
import {
    MatTabGroup,
    MatTab,
    MatTabsModule,
    MatTabChangeEvent,
} from '@angular/material/tabs'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler'
import { MessageParsingService } from '../services/message-parsing.service'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import DateUtils from '../util/date-util'
import { StorageService } from '../services/storage.service'

describe('DatePickerComponent', () => {
    let component: DatePickerComponent
    let fixture: ComponentFixture<DatePickerComponent>
    let messageParsingService: jasmine.SpyObj<MessageParsingService>
    let storageService: jasmine.SpyObj<StorageService>
    const testFileName = 'unit_test'

    const mockMessageParsingService = jasmine.createSpyObj(
        'messageParsingService',
        ['getYearMonthMap']
    )
    const mockStorageService = jasmine.createSpyObj('storageService', [
        'readLastViewedYearMonthFromStorage',
        'writeLastViewedYearMonthToStorage',
        'getFileName',
    ])
    const testDatesMap = new Map<number, Set<number>>()
    testDatesMap.set(2000, new Set<number>([1, 2, 3]))
    testDatesMap.set(2010, new Set<number>([12]))

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatePickerComponent, MonthPipe, SetToArrayPipe],
            imports: [MatTabsModule, NoopAnimationsModule],
            providers: [
                {
                    provide: MessageParsingService,
                    useValue: mockMessageParsingService,
                },
                {
                    provide: StorageService,
                    useValue: mockStorageService,
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents()
        mockMessageParsingService.getYearMonthMap.and.returnValue(testDatesMap)
        mockStorageService.getFileName.and.returnValue(testFileName)
        fixture = TestBed.createComponent(DatePickerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('ngOnInit()', () => {
        it('updates the current selected yearMonth if there is a value in localstorage', () => {
            //Arrange
            const storedYearMonth = DateUtils.createYearMonth(2010, 12)
            mockStorageService.readLastViewedYearMonthFromStorage.and.returnValue(
                storedYearMonth
            )

            //Act
            component.ngOnInit()

            //Assert
            expect(component['selectedYear']).toBe(2010)
            expect(component['selectedMonth']).toBe(12)
        })

        it('sets selectedYear and selectedMonth to first values of datesMap if no value in localstorage', () => {
            //Arrange
            component['fileName'] = undefined

            //Act
            component.ngOnInit()

            //Assert
            expect((component as any).selectedYear).toBe(2000)
            expect((component as any).selectedMonth).toBe(1)
        })
    })

    describe('onYearSelected()', () => {
        it('updates the current selected yearMonth and emits this as an event', () => {
            //Arrange
            const expectedYear = 2010
            const expectedMonth = 12
            const tabChangeEvent: MatTabChangeEvent = {
                tab: { textLabel: expectedYear } as any,
                index: 0,
            }
            component['selectedYear'] = 2000
            component['selectedMonth'] = 1
            spyOn(component.yearMonthSelectEvent, 'emit')

            //Act
            component.onYearSelected(tabChangeEvent)

            //Assert
            expect(component.yearMonthSelectEvent.emit).toHaveBeenCalledWith({
                year: expectedYear,
                month: expectedMonth,
            })
            expect(
                mockStorageService.writeLastViewedYearMonthToStorage
            ).toHaveBeenCalledWith({ year: expectedYear, month: expectedMonth })
        })
    })

    describe('onMonthSelected()', () => {
        it('updates the current selected yearMonth and emits this as an event', () => {
            //Arrange
            const mockTabChangeEvent: MatTabChangeEvent = {
                tab: { textLabel: 'March' } as any,
                index: 2,
            }
            component['selectedYear'] = 2000
            component['selectedMonth'] = 1
            spyOn(component.yearMonthSelectEvent, 'emit')

            //Act
            component.onMonthSelected(mockTabChangeEvent)

            //Assert
            expect(component.yearMonthSelectEvent.emit).toHaveBeenCalledWith({
                year: 2000,
                month: 3,
            })
            expect(
                mockStorageService.writeLastViewedYearMonthToStorage
            ).toHaveBeenCalledWith({ year: 2000, month: 3 })
        })
    })

    it('creates an array of tabs corresponding to the datesMap object', () => {
        //Act
        component.ngOnInit()
        const yearTabGroup: MatTabGroup = fixture.debugElement.query(
            By.css('#yearTabs')
        ).componentInstance
        const monthTabGroup: MatTabGroup = fixture.debugElement.query(
            By.css('#monthTabs')
        ).componentInstance
        const yearTabs: MatTab[] = yearTabGroup._tabs.toArray()
        const monthTabs: MatTab[] = monthTabGroup._tabs.toArray()

        //Assert
        expect(yearTabs[0].textLabel).toBe('2000')
        expect(yearTabs[1].textLabel).toBe('2010')
        expect(monthTabs[0].textLabel).toBe('January')
        expect(monthTabs[1].textLabel).toBe('February')
        expect(monthTabs[2].textLabel).toBe('March')
    })

    it('emits a yearMonthSelectEvent containing the selected Year and Month when tab is clicked', waitForAsync(() => {
        //Arrange
        spyOn(component, 'onYearSelected').and.callThrough()
        spyOn(component.yearMonthSelectEvent, 'emit')
        component['selectedYear'] = 2000
        component['selectedMonth'] = 1
        fixture.detectChanges()
        const yearTabGroup: MatTabGroup = fixture.debugElement.query(
            By.css('#yearTabs')
        ).componentInstance

        // Act
        yearTabGroup.selectedIndex = 1
        fixture.detectChanges()

        //Assert
        expect(component.onYearSelected).toHaveBeenCalled()
        expect(component.yearMonthSelectEvent.emit).toHaveBeenCalledWith({
            year: 2010,
            month: 12,
        })
    }))
})
