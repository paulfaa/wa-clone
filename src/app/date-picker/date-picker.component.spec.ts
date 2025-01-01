import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { DatePickerComponent } from './date-picker.component'
import { MessageService } from '../services/message.service'
import { MonthPipe } from './month.pipe'
import { SetToArrayPipe } from './set-to-array.pipe'
import { By } from '@angular/platform-browser'
import { MatTabGroup, MatTab, MatTabsModule } from '@angular/material/tabs'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler'
import { MessageParsingService } from '../services/message-parsing.service'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('DatePickerComponent', () => {
    let component: DatePickerComponent
    let fixture: ComponentFixture<DatePickerComponent>
    let mockMessageService: jasmine.SpyObj<MessageService>
    let mockMessageParsingService: jasmine.SpyObj<MessageParsingService>

    mockMessageService = jasmine.createSpyObj('mockMessageService', [
        '$getMessages',
    ])
    mockMessageParsingService = jasmine.createSpyObj(
        'mockMessageParsingService',
        ['getYearMonthMap']
    )
    const testDatesMap = new Map<number, Set<number>>()
    testDatesMap.set(2000, new Set<number>([1, 2, 3]))
    testDatesMap.set(2010, new Set<number>([12]))

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatePickerComponent, MonthPipe, SetToArrayPipe],
            imports: [MatTabsModule, NoopAnimationsModule],
            providers: [
                { provide: MessageService, useValue: mockMessageService },
                {
                    provide: MessageParsingService,
                    useValue: mockMessageParsingService,
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents()

        mockMessageParsingService.getYearMonthMap.and.returnValue(testDatesMap)
        fixture = TestBed.createComponent(DatePickerComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('ngOnInit sets selectedYear and selectedMonth to first values of datesMap', () => {
        //Act
        component.ngOnInit()

        //Assert
        expect((component as any).selectedYear).toBe(2000)
        expect((component as any).selectedMonth).toBe(1)
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
        component.ngOnInit()
        const yearTabGroup: MatTabGroup = fixture.debugElement.query(
            By.css('#yearTabs')
        ).componentInstance

        // Act
        yearTabGroup.selectedIndex = 2 // Select the second tab programmatically
        fixture.detectChanges()

        //Assert
        expect(component.onYearSelected).toHaveBeenCalled()
        expect(component.yearMonthSelectEvent.emit).toHaveBeenCalledWith({
            year: 2010,
            month: 11,
        })
    }))
})
