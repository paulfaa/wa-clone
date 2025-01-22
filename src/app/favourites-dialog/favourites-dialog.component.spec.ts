import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog'

import { FavouritesDialogComponent } from './favourites-dialog.component'
import { sampleMessage1, sampleMessage2 } from '../test/testMessages'
import { StorageService } from '../services/storage.service'
import { By } from '@angular/platform-browser'

describe('FavouritesDialogComponent', () => {
    let component: FavouritesDialogComponent
    let fixture: ComponentFixture<FavouritesDialogComponent>
    let mockStorageService: jasmine.SpyObj<StorageService>
    let mockMatDialogRef: jasmine.SpyObj<
        MatDialogRef<FavouritesDialogComponent>
    >
    let mockMatDialogData: any

    mockStorageService = jasmine.createSpyObj('mockMessageParsingService', [
        'getFileName',
    ])
    mockMatDialogRef = jasmine.createSpyObj('mockMatDialogRef', ['close'])
    mockMatDialogData = {}
    const mockFavourites = [sampleMessage1, sampleMessage2]

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule],
            declarations: [FavouritesDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockMatDialogRef },
                { provide: StorageService, useValue: mockStorageService },
                { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(FavouritesDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('ngOnInit()', () => {
        it('sets name to that of the messageParsingService', () => {
            //Arrange
            const fileName = 'chat.json'
            mockStorageService.getFileName.and.returnValue(fileName)

            //Act
            component.ngOnInit()

            //Assert
            expect(component.fileName).toBe(fileName)
        })
    })

    describe('closeDialog()', () => {
        it('closes the dialog', () => {
            //Act
            component.closeDialog()

            //Assert
            expect(mockMatDialogRef.close).toHaveBeenCalled
        })
    })

    describe('the dialog content', () => {
        it('displays each of the favourited messages', () => {
            //Arrange
            component.favourites = mockFavourites

            //Act
            component.ngOnInit()

            //Assert
        })

        it('displays a message if no messages are favourited', () => {
            //Arrange
            const expectedMessage = 'No messages are favourited!'
            component.favourites = []

            // Act
            component.ngOnInit()
            const content = fixture.debugElement.query(
                By.css('mat-dialog-content div')
            )

            // Assert
            expect(content.nativeElement.textContent.trim()).toBe(
                expectedMessage
            )
        })
    })
})
