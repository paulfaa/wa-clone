import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import { MessageService } from '../services/message.service';
import { MonthPipe } from './month.pipe';
import { By } from '@angular/platform-browser';
import { MatTabGroup, MatTab, MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['$getMessages']);
  const testDatesMap = new Map<number, number[]>();
  testDatesMap.set(2000, [1,2,3]);
  testDatesMap.set(2010, [12]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerComponent, MonthPipe ],
      imports: [MatTabsModule],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit sets selectedYear and selectedMonth to first values of datesMap', () => {
    //Arrange
    component.datesMap = testDatesMap;
    expect(component.selectedYear).toBe(undefined);
    expect(component.selectedMonth).toBe(undefined);

    //Act
    component.ngOnInit();

    //Assert
    expect(component.selectedYear).toBe(2000);
    expect(component.selectedMonth).toBe(1);
  });

  it('creates an array of tabs corresponding to the datesMap object', () => {
    //Arrange
    component.datesMap = testDatesMap;

    //Act
    component.ngOnInit();
    const yearTabGroup: MatTabGroup = fixture.debugElement.query(
      By.css('#yearTabs'),
    ).componentInstance;
    const monthTabGroup: MatTabGroup = fixture.debugElement.query(
      By.css('#monthTabs'),
    ).componentInstance;
    const yearTabs: MatTab[] = yearTabGroup._tabs.toArray();
    const monthTabs: MatTab[] = monthTabGroup._tabs.toArray();

    //Assert
    expect(yearTabs[0].textLabel).toBe("2000");
    expect(yearTabs[1].textLabel).toBe("2010");
    expect(monthTabs[0].textLabel).toBe("January");
    expect(monthTabs[1].textLabel).toBe("February");
    expect(monthTabs[2].textLabel).toBe("March");
  });

  it('emits a Date event containing the selected Year and Month when tab is clicked', waitForAsync(() => {
    //Arrange
    spyOn(component, 'onYearSelected');
    component.datesMap = testDatesMap;
    component.ngOnInit();
    const secondTab = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement;
    
    //Act
    secondTab.click();

    //Assert
    expect(component.onYearSelected).toHaveBeenCalled()
    expect(component.dateSelectEvent.emit).toHaveBeenCalledWith(new Date(2010, 12));
  }));
});
