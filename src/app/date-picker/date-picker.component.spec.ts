import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import { MessageService } from '../services/message.service';
import { MonthPipe } from './month.pipe';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['$getMessages']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerComponent, MonthPipe ],
      providers: [{ provide: MessageService, useValue: mockMessageService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits a Date event containing the selected Year and Month when tab is clicked', () => {
    //Arrange

    //Act

    //Assert
  });
});
