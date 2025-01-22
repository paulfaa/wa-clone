import { Injectable } from '@angular/core'
import { WhatsappMessage, YearMonth } from '../models/models'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    private fileName: string = ''
    private LAST_SELECTED_STORAGE_KEY = '.lastSelectedYearMonth'
    private FAVOURITES_STORAGE_KEY = '.favourites'

    public setFileName(fileName: string): void {
        this.fileName = fileName
    }

    public getFileName(): string {
        return this.fileName
    }

    public writeFavouritesMapToStorage(
        dataToSave: Map<string, Map<string, WhatsappMessage>>
    ): void {
        const serializedData = Array.from(dataToSave, ([key, innerMap]) => [
            key,
            Array.from(innerMap),
        ])
        localStorage.setItem(
            this.fileName + this.FAVOURITES_STORAGE_KEY,
            JSON.stringify(serializedData)
        )
    }

    public readFavouritesMapFromStorage(): Map<
        string,
        Map<string, WhatsappMessage>
    > | null {
        try {
            const key = this.fileName + this.FAVOURITES_STORAGE_KEY
            const data = localStorage.getItem(key)
            if (data && data !== 'undefined') {
                console.debug('Stored data for key ' + key + ': ' + data)

                const parsedData = JSON.parse(data) as [
                    string,
                    [string, WhatsappMessage][],
                ][]
                const map = new Map<string, Map<string, WhatsappMessage>>(
                    parsedData.map(([key, innerArray]) => [
                        key,
                        new Map(innerArray),
                    ])
                )
                return map
            } else {
                console.log('Nothing in local storage with key ' + key)
                return null
            }
        } catch (e) {
            console.error('Error reading from storage: ', e)
            return null
        }
    }

    public deleteFromStorage(keyName: string): void {
        try {
            localStorage.removeItem(keyName)
        } catch (e) {
            console.error('Error deleting from storage: ', e)
        }
    }

    public clearAllStorage(): void {
        localStorage.clear()
    }

    public readLastViewedYearMonthFromStorage(): YearMonth | undefined {
        const key = this.fileName + this.LAST_SELECTED_STORAGE_KEY
        const storedData = localStorage.getItem(key)
        if (storedData) {
            try {
                return JSON.parse(storedData) as YearMonth
            } catch (error) {
                console.log(`Error parsing stored data for key ${key}: `, error)
            }
        }
        return undefined
    }

    public writeLastViewedYearMonthToStorage(yearMonth: YearMonth): void {
        const key = this.fileName + this.LAST_SELECTED_STORAGE_KEY
        localStorage.setItem(key, JSON.stringify(yearMonth))
        console.debug(`Wrote yearMonth ${yearMonth} to storage with key ${key}`)
    }
}
