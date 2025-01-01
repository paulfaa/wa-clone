import { TestBed } from '@angular/core/testing'
import { MessageService } from './message.service'
import { FavouritesService } from './favourites.service'
import {
    sampleMessage1,
    sampleMessage4,
    sampleMessage5,
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
    const messageMap = new Map([
        ['2019-10', messagesOct2019],
        ['2020-5', messagesMay2020],
    ])

    beforeEach(() => {
        service = new MessageService(mockFavouritesService)
        TestBed.configureTestingModule({
            declarations: [MessageService],
            providers: [
                { provide: FavouritesService, useValue: mockFavouritesService },
            ],
        }).compileComponents()
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
        it('returns all messages for the given yearMonth', () => {
            // Arrange
            const dateWithMatches = DateUtils.createYearMonth(2019, 10)
            service['$allMessages'].next(messageMap)
            mockFavouritesService.getFavouritedIds.and.returnValue([
                sampleMessage1.id,
            ])

            // Act
            service
                .$getFilteredMessages(dateWithMatches)
                .subscribe((result) => {
                    expect(result.length).toEqual(1)
                })
        })

        it('does not update the isFavourite property on any of the messages if there are no favourited messages', () => {
            // Arrange
            const dateWithMatches = DateUtils.createYearMonth(2020, 5)
            service['$allMessages'].next(messageMap)
            mockFavouritesService.getFavouritedIds.and.returnValue(new Set())

            // Act
            service
                .$getFilteredMessages(dateWithMatches)
                .subscribe((result) => {
                    expect(result.length).toEqual(2)
                    expect(result[0].isFavourite).toBe(false)
                    expect(result[1].isFavourite).toBe(false)
                })
        })

        it('updates the isFavourite property on the messages if ids match those from favouritesService', () => {
            // Arrange
            const dateWithMatches = DateUtils.createYearMonth(2020, 5)
            service['$allMessages'].next(messageMap)
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
    })
})
