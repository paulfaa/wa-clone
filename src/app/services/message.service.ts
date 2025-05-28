import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, map, timestamp } from 'rxjs'
import { WhatsappMessage, YearMonth } from '../models/models'
import DateUtils from '../util/date-util'
import { FavouritesService } from './favourites.service'
import { isEqual } from 'lodash'

@Injectable()
export class MessageService {
    $allMessages: BehaviorSubject<Map<string, WhatsappMessage[]>> =
        new BehaviorSubject<Map<string, WhatsappMessage[]>>(
            new Map<string, WhatsappMessage[]>()
        )
    $progressValue: BehaviorSubject<number> = new BehaviorSubject<number>(0)

    constructor(private favouritesService: FavouritesService) {}

    public addMessages(messageMap: Map<string, WhatsappMessage[]>) {
        this.$allMessages.next(messageMap)
    }

    public clearAllMessages(): void {
        this.$allMessages = new BehaviorSubject<Map<string, WhatsappMessage[]>>(
            new Map<string, WhatsappMessage[]>()
        )
    }

    public $getAllMessages(): Observable<Map<string, WhatsappMessage[]>> {
        return this.$allMessages.asObservable()
    }

    public $getFilteredMessages(
        yearMonth: YearMonth
    ): Observable<WhatsappMessage[]> {
        const keyString = DateUtils.yearMonthToString(yearMonth)
        const favouritedIds = new Set(
            this.favouritesService.getFavouritedIds(yearMonth)
        )

        console.log('Filtering for', yearMonth)

        return this.$allMessages.pipe(
            map((messagesMap: Map<string, WhatsappMessage[]>) => {
                const filteredMessages = messagesMap
                    .get(keyString)!
                    .filter((message) => {
                        const messageDate = new Date(message.timestamp)
                        return (
                            DateUtils.getActualMonth(messageDate) ===
                                yearMonth.month &&
                            messageDate.getFullYear() === yearMonth.year
                        )
                    })
                filteredMessages.forEach((message) => {
                    var isFav = favouritedIds!.has(message.id)
                    message.isFavourite = isFav
                    if (message.quotedMessageId && message.quotedTimestamp) {
                        if (
                            isEqual(
                                DateUtils.createYearMonthFromTimestamp(
                                    message.quotedTimestamp
                                ),
                                yearMonth
                            )
                        ) {
                            let left = 0
                            let right = filteredMessages.length - 1
                            let found = false

                            while (left <= right) {
                                var middle = Math.floor((left + right) / 2)
                                var midDate = filteredMessages[middle].timestamp

                                if (midDate === message.quotedTimestamp) {
                                    message.quote = filteredMessages[middle]
                                    found = true
                                    break
                                } else if (midDate < message.quotedTimestamp) {
                                    left = middle + 1
                                } else {
                                    right = middle - 1
                                }
                            }
                            if (!found) {
                                message.quote = this.buildErrorQuote(message)
                            }
                        } else {
                            message.quote = this.buildErrorQuote(message)
                        }
                    }
                })
                return filteredMessages
            })
        )
    }

    private buildErrorQuote(message: WhatsappMessage): WhatsappMessage {
        return {
            id: '',
            fromMe: message.fromMe,
            type: 'text',
            text: `Failed to load quote ${message.quotedMessageId} with date ${message.quotedTimestamp}`,
            timestamp: message.timestamp,
            isFavourite: false,
            quotedMessageId: '',
            quotedTimestamp: ''
        } as WhatsappMessage
    }
}
