import { Injectable } from '@angular/core'
import { FavouritesService } from './favourites.service'
import { MessageService } from './message.service'
import { Chat, WhatsappMessage, YearMonth } from '../models/models'
import DateUtils from '../util/date-util'

@Injectable({
    providedIn: 'root',
})
export class MessageParsingService {
    //public onParseComplete: EventEmitter<ParseEvent> = new EventEmitter<ParseEvent>();
    private yearMonthMap: Map<number, Set<number>>
    private quoteMap: Map<string, Set<WhatsappMessage>>
    private quoteIdsMap: Map<string, Set<string>>
    private messageMap: Map<string, WhatsappMessage[]>
    private filenameRegex: RegExp = /([^\/]+$)/
    chatOwner: string = ''
    participant: string = ''
    chatMembers: string[]
    isGroupChat: boolean
    messageCount: number

    constructor(private messageService: MessageService) {
        this.chatMembers = []
        this.isGroupChat = false
        this.messageCount = 0
        this.yearMonthMap = new Map<number, Set<number>>()
        this.quoteMap = new Map<string, Set<WhatsappMessage>>()
        this.messageMap = new Map<string, WhatsappMessage[]>()
        this.quoteIdsMap = new Map<string, Set<string>>()
    }

    public getYearMonthMap() {
        return this.yearMonthMap
    }

    public getQuoteMap(): Map<string, Set<WhatsappMessage>> {
        return this.quoteMap
    }

    private addChatMember(member: string): void {
        if (!this.chatMembers.includes(member)) {
            this.chatMembers.push(member)
        }
    }

    private populateQuoteMap(quoteId: string, timestamp: string): void {
        const date = new Date(timestamp)
        const keyString = DateUtils.generateYearMonthKey(date)
        const storedQuotes = this.quoteIdsMap.get(keyString)
        if (!storedQuotes) {
            this.quoteIdsMap.set(keyString, new Set([quoteId]))
        } else {
            storedQuotes.add(quoteId)
        }
    }

    private populateMessageMap(message: WhatsappMessage): void {
        const date = new Date(message.timestamp)
        const key = DateUtils.generateYearMonthKey(date)
        const messages = this.messageMap.get(key)
        if (!messages) {
            this.messageMap.set(key, [message])
        } else {
            messages.push(message)
        }
    }

    private messageWasQuoted(message: WhatsappMessage): boolean {
        const key = DateUtils.generateYearMonthKey(new Date(message.timestamp))
        if (this.quoteIdsMap.get(key)?.has(message.id)) {
            return true
        }
        return false
    }

    //parse messages in reverse order
    //foreach
    //if current message has quoteId/timestamp
    //add messageId of current message to map
    //

    private populateYearMonthMap(yearMonthArrray: YearMonth[]): void {
        yearMonthArrray.forEach((yearMonth: YearMonth) => {
            try {
                const year = yearMonth.year
                const month = yearMonth.month + 1
                let storedMonths = this.yearMonthMap.get(year)
                if (!storedMonths) {
                    this.yearMonthMap.set(year, new Set([month]))
                } else {
                    storedMonths.add(month)
                }
            } catch (error) {
                console.error('Failed to populate yearMonthMap: ', error)
            }
        })
    }

    private formatFilename(filename?: string): string | undefined {
        const match = filename?.match(this.filenameRegex)
        if (match) {
            return match[0]
        } else {
            return undefined
        }
    }

    public parseJsonString(json: string): void {
        var parsedJson = JSON.parse(json)
        var messages: WhatsappMessage[] = []
        try {
            parsedJson = JSON.parse(json)
        } catch (error) {
            throw 'Failed to parse JSON: ' + error
        }
        if (parsedJson.chats) {
            messages = parsedJson.chats[0].messages
            //messages = parsedJson.chats[0].messages.reverse();
        } else if (parsedJson.messages) {
            messages = parsedJson.messages
            //messages = parsedJson.messages.reverse();
        } else {
            throw 'Invalid chat format'
        }
        messages.forEach((msg: WhatsappMessage) => {
            if (msg.filename) {
                msg.filename = this.formatFilename(msg.filename)
            }
            if (msg.quotedMessageId) {
                this.populateQuoteMap(msg.quotedMessageId, msg.quotedTimestamp!)
            }
            this.populateMessageMap(msg)
        })
        const yearMonthArray: YearMonth[] = []
        const keys = this.messageMap.keys()
        for (const key of keys) {
            const yearDate = DateUtils.generateYearMonthFromKey(key)
            yearMonthArray.push(yearDate)
        }
        this.populateYearMonthMap(yearMonthArray)
        this.messageService.addMessages(this.messageMap)
        this.messageMap = new Map<string, WhatsappMessage[]>() //clear map once data has been passed to messageService
    }

    public getAllChatMembers(members: string[]): string[] {
        var m: string[] = []
        for (let index = 0; index < members.length; index++) {
            const member = members[index]
            if (member !== undefined && !m.includes(member)) {
                m.push(member)
            }
        }

        if (m.length > 2) {
            this.isGroupChat = true
        }
        return m
    }
}
