import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MessageService } from '../services/message.service'

import { FileUploadComponent } from './file-upload.component'
import { MessageParsingService } from '../services/message-parsing.service'
import { FavouritesService } from '../services/favourites.service'
import { Router } from '@angular/router'

describe('FileUploadComponent', () => {
    let component: FileUploadComponent
    let fixture: ComponentFixture<FileUploadComponent>
    let messageService: jasmine.SpyObj<MessageService>
    let favouritesService: jasmine.SpyObj<FavouritesService>
    let messageParsingService: jasmine.SpyObj<MessageParsingService>

    const mockRouter = jasmine.createSpyObj('Router', ['navigate'])
    const mockMessageService = jasmine.createSpyObj('messageService', [
        '$getMessages',
    ])
    const mockFavouritesService = jasmine.createSpyObj('favouritesService', [
        'initStorage',
    ])
    const mockMessageParsingService = jasmine.createSpyObj(
        'messageParsingService',
        ['parseJsonString', 'parseText']
    )

    const event = {
        target: {
            files: [
                new File(['Contents of the file'], 'fileName', {
                    type: 'application/json',
                }),
                {
                    name: 'fileName',
                    type: 'application/json',
                    contents: 'Contents of the file',
                },
            ],
        },
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, MatIconModule],
            declarations: [FileUploadComponent],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: MessageService, useValue: mockMessageService },
                { provide: FavouritesService, useValue: mockFavouritesService },
                {
                    provide: MessageParsingService,
                    useValue: mockMessageParsingService,
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(FileUploadComponent)
        component = fixture.componentInstance
        component.fileName = undefined
        fixture.detectChanges()
    })

    afterEach(() => {
        mockRouter.navigate.calls.reset()
        mockMessageParsingService.parseJsonString.calls.reset()
        mockFavouritesService.initStorage.calls.reset()
        mockMessageService.$getMessages.calls.reset()
        fixture.destroy()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('readFileContent()', () => {
        it('can deal with empty files', async () => {
            // Arrange
            const file = null

            // Act
            const result = await component.readFileContent(
                file as unknown as File
            )

            // Assert
            expect(result).toEqual('')
        })

        it('parses the contents of files', async () => {
            // Arrange
            const file = new File(['Hello World!'], 'test.txt', {
                type: 'text/plain',
            })

            // Act
            const contents = await component.readFileContent(file)

            // Assert
            expect(contents).toEqual('Hello World!')
        })
    })

    describe('onFileSelected()', () => {
        it('throws an exception if there is an error parsing file', async () => {
            //arrange
            mockMessageParsingService.parseJsonString.and.throwError(
                'Parsing error'
            )

            //act
            await component.onFileSelected(event)

            //assert
            expect(component.fileName).toBe('fileName')
            expect(mockMessageParsingService.parseJsonString).toHaveBeenCalled()
        })

        it('calls the parseJsonString() method of messageService when json file is uploaded', async () => {
            //arrange
            expect(component.fileName).toBe(undefined)
            const expectedContent = 'Contents of the file'

            //act
            await component.onFileSelected(event)

            //assert
            expect(component.fileName).toBe('fileName')
            expect(
                mockMessageParsingService.parseJsonString
            ).toHaveBeenCalledWith(expectedContent)
            expect(mockFavouritesService.initStorage).toHaveBeenCalledWith(
                'fileName'
            )
            expect(component.showError).toBe(false)
            expect(mockRouter.navigate).toHaveBeenCalledWith(['view'])
        })
    })
})
