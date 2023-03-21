import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../services/message.service';

import { FavouritesDialogComponent } from './favourites-dialog.component';

describe('FavouritesDialogComponent', () => {
  let component: FavouritesDialogComponent;
  let fixture: ComponentFixture<FavouritesDialogComponent>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<FavouritesDialogComponent>>;
  let mockMatDialogData: any;

  mockMessageService = jasmine.createSpyObj('mockMessageService', ['']);
  mockMatDialogRef = jasmine.createSpyObj('mockMatDialogRef', ['']);
  mockMatDialogData = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ FavouritesDialogComponent ],
      providers: [{ provide: MessageService, useValue: mockMessageService },
                  { provide: MatDialogRef, useValue: mockMatDialogRef },
                  { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
