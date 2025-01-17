import { Injectable } from '@angular/core'
import { WhatsappMessage, YearMonth } from '../models/models'
import DateUtils from '../util/date-util'
import { StorageService } from './storage.service'

@Injectable({
    providedIn: 'root',
})
export class FavouritesService {
    //Outer map is keyed by year-month, inner map is keyed by message id
    private favouritesMap: Map<string, Map<string, WhatsappMessage>>
    private fileName: string | undefined
    private areFavouritesModified = false

    constructor(private storageService: StorageService) {
        this.favouritesMap = new Map<string, Map<string, WhatsappMessage>>()
    }

    public initStorage(currentFileName: string): void {
        if (currentFileName && currentFileName != '') {
            this.fileName = currentFileName
            const favourites =
                this.storageService.readFavouritesMapFromStorage()
            if (favourites != null) {
                this.favouritesMap = favourites
                console.log('loaded stored favourites for ' + favourites)
            } else {
                console.log('no saved data found')
            }
        }
    }

    public getFavouritedIds(yearMonth: YearMonth): Set<string> {
        const favouritesForYearMonth = this.favouritesMap.get(
            DateUtils.yearMonthToString(yearMonth)
        )
        return new Set(favouritesForYearMonth?.keys())
    }

    public getAllFavourites(): WhatsappMessage[] {
        const allFavourites = []
        const sortedKeys = Array.from(this.favouritesMap.keys()).sort()
        for (const key of sortedKeys) {
            const innerMap = this.favouritesMap.get(key)
            for (const message of innerMap?.values() || []) {
                allFavourites.push(message)
            }
        }
        return allFavourites
    }

    public isFavourite(message: WhatsappMessage): boolean {
        const key = DateUtils.messageToYearMonthString(message)
        const favourites = this.favouritesMap.get(key)
        if (favourites && favourites.has(message.id)) {
            return true
        }
        return false
    }

    public addToFavourites(message: WhatsappMessage): void {
        const key = DateUtils.messageToYearMonthString(message)
        const storedFavourites = this.favouritesMap.get(key)
        if (!storedFavourites) {
            this.favouritesMap.set(key, new Map([[message.id, message]]))
        } else {
            storedFavourites.set(message.id, message)
        }
        this.updateStorage()
    }

    public removeFromFavourites(message: WhatsappMessage): void {
        const key = DateUtils.messageToYearMonthString(message)
        const storedFavourites = this.favouritesMap.get(key)
        if (storedFavourites?.has(message.id)) {
            storedFavourites.delete(message.id)
            console.log(
                `favourites-service: removed message with id ${message.id} from ${key}`
            )
            if (storedFavourites.size == 0) {
                this.favouritesMap.delete(key)
                console.log(
                    `favourites-service: removed yearDate ${key} as it contains no messages`
                )
            }
        }
        this.updateStorage()
    }

    public clearFavourites(): void {
        this.favouritesMap = new Map<string, Map<string, WhatsappMessage>>()
        this.updateStorage()
    }

    public downloadFavouritedMessages(): void {
        if (!this.areFavouritesModified) {
            return
        }
        const messages: WhatsappMessage[] = []
        const sortedKeys = Array.from(this.favouritesMap.keys()).sort()
        for (const key of sortedKeys) {
            const innerMap = this.favouritesMap.get(key)
            for (const message of innerMap?.values() || []) {
                messages.push(message)
            }
        }
        const simplifiedMessages = messages.map((msg) => ({
            id: msg.id,
            date: msg.timestamp,
            contents: msg.text,
        }))
        const jsonData = JSON.stringify(simplifiedMessages, null, 2)
        const blob = new Blob([jsonData], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = this.fileName + '_msg.json'
        anchor.style.display = 'none'
        document.body.appendChild(anchor)
        anchor.click()
        window.URL.revokeObjectURL(url)
        anchor.remove()
    }

    private updateStorage(): void {
        this.storageService.writeFavouritesMapToStorage(this.favouritesMap)
        this.areFavouritesModified = true
    }
}
