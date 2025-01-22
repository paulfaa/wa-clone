import { TestBed } from '@angular/core/testing'
import { MessageService } from './message.service'
import { FavouritesService } from './favourites.service'
import {
    sampleMessage1,
    sampleMessage4,
    sampleMessage5,
    sampleQuotedMessage,
    sampleQuotingMessage,
} from '../test/testMessages'
import DateUtils from '../util/date-util'
import { BehaviorSubject } from 'rxjs'
import { WhatsappMessage } from '../models/models'

describe('MessageService', () => {
    let service: MessageService
    let favouritesService: jasmine.SpyObj<FavouritesService>
    const mockFavouritesService = jasmine.createSpyObj('favouritesService', [
        'getFavouritedIds',
    ])
    const messagesOct2019 = [sampleMessage1]
    const messagesMay2020 = [sampleMessage4, sampleMessage5]
    const messagesJuly2021 = [sampleQuotedMessage, sampleQuotingMessage]
    const messageMap = new Map([
        ['2019-10', messagesOct2019],
        ['2020-5', messagesMay2020],
        ['2021-7', messagesJuly2021],
    ])

    beforeEach(() => {
        service = new MessageService(mockFavouritesService)
        TestBed.configureTestingModule({
            declarations: [MessageService],
            providers: [
                { provide: FavouritesService, useValue: mockFavouritesService },
            ],
        }).compileComponents()
        service['$allMessages'].next(messageMap)
        mockFavouritesService.getFavouritedIds.and.returnValue(new Set())
    })

    afterEach(() => {
        service['$allMessages'] = new BehaviorSubject(
            new Map<string, WhatsappMessage[]>()
        )
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    describe('$getFilteredMessages()', () => {
        it('returns all messages for the given yearMonth', async () => {
            // Arrange
            const dateWithMatches = DateUtils.createYearMonth(2019, 10)

            // Act
            service
                .$getFilteredMessages(dateWithMatches)
                .subscribe((result) => {
                    expect(result.length).toEqual(1)
                    expect(result[0]).toEqual(sampleMessage1)
                })
        })

        it('does not update the isFavourite property on any of the messages if there are no favourited messages', async () => {
            // Arrange
            const dateWithMatches = DateUtils.createYearMonth(2020, 5)

            // Act
            service
                .$getFilteredMessages(dateWithMatches)
                .subscribe((result) => {
                    expect(result.length).toEqual(2)
                    expect(result[0].isFavourite).toBe(false)
                    expect(result[1].isFavourite).toBe(false)
                })
        })

        it('updates the isFavourite property on the messages if ids match those from favouritesService', async () => {
            // Arrange
            const dateWithMatches = DateUtils.createYearMonth(2020, 5)
            mockFavouritesService.getFavouritedIds.and.returnValue([
                sampleMessage4.id,
                sampleMessage5.id,
            ])

            // Act
            service
                .$getFilteredMessages(dateWithMatches)
                .subscribe((result) => {
                    expect(result.length).toEqual(2)
                    expect(result[0].isFavourite).toBe(true)
                    expect(result[1].isFavourite).toBe(true)
                })
        })

        it('sets the quote property of the quoting message if the quoted message exists in filteredMessages', async () => {
            // Arrange
            const dateWithQuotedMessages = DateUtils.createYearMonth(2021, 7)
            const expectedQuote = 'Quote contents'

            // Act
            service
                .$getFilteredMessages(dateWithQuotedMessages)
                .subscribe((result) => {
                    expect(result.length).toEqual(2)
                    expect(result[1].quote).toBe(expectedQuote)
                })
        })

        it('sets the quote property of the quoting message if the quoted message exists in filteredMessages', async () => {
            // Arrange
            const dateWithQuotedMessages = DateUtils.createYearMonth(2021, 7)
            const map = new Map([['2021-7', [sampleQuotingMessage]]])
            service['$allMessages'].next(map)
            const expectedQuote =
                'Failed to load quote 51504725-b516-48ac-9bc7-7374c1619bfp with date 2021-07-14T09:20:00Z'

            // Act
            service
                .$getFilteredMessages(dateWithQuotedMessages)
                .subscribe((result) => {
                    expect(result.length).toEqual(1)
                    expect(result[0].quote).toBe(expectedQuote)
                })
        })
    })
})
