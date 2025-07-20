import { Injectable } from '@angular/core'
import { WhatsappMessage, YearMonth } from '../models/models'
import DateUtils from '../util/date-util'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class FavouritesService {
    private favouritesMapSubject = new BehaviorSubject<
        Map<string, Map<string, WhatsappMessage>>
    >(new Map())
    public favouritesMap$ = this.favouritesMapSubject.asObservable()

    private favouritesInitializedSubject = new BehaviorSubject<boolean>(false)
    public favouritesInitialized$ =
        this.favouritesInitializedSubject.asObservable()

    private favouritesApiUrl = '/api/favourites'
    private headers: HttpHeaders | undefined

    constructor(private http: HttpClient) {}

    public initFavourites(filename: string): void {
        if (!filename || filename === '') {
            console.error('initFavourites called with empty filename')
            return
        }
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-filename': filename
        })
        this.favouritesApiGetFavourites().subscribe({
            next: (response: any) => {
                console.log('Stored favourites loaded from backend:', response)
                // TODO: response will never be null, returns an empty map if no favourites are stored
                if (response != null) {
                    this.favouritesMapSubject.next(response)
                    console.log('Loaded stored favourites for ' + filename)
                } else {
                    console.log('No saved data found for ' + filename)
                }
                this.favouritesInitializedSubject.next(true)
            },
            error: (err: any) => {
                console.error('Failed to load favourites:', err)
            }
        })
    }

    public getFavouritedIds(yearMonth: YearMonth): Set<string> {
        const favouritesForYearMonth = this.favouritesMapSubject
            .getValue()
            .get(DateUtils.yearMonthToString(yearMonth))
        return new Set(favouritesForYearMonth?.keys())
    }

    public getAllFavourites(): WhatsappMessage[] {
        const allFavourites = []
        const sortedKeys = Array.from(
            this.favouritesMapSubject.getValue().keys()
        ).sort()
        for (const key of sortedKeys) {
            const innerMap = this.favouritesMapSubject.getValue().get(key)
            for (const message of innerMap?.values() || []) {
                allFavourites.push(message)
            }
        }
        return allFavourites
    }

    public isFavourite(message: WhatsappMessage): boolean {
        const key = DateUtils.messageToYearMonthString(message)
        const favourites = this.favouritesMapSubject.getValue().get(key)
        if (favourites && favourites.has(message.id)) {
            return true
        }
        return false
    }

    public addToFavourites(message: WhatsappMessage): void {
        const key = DateUtils.messageToYearMonthString(message)
        const map = new Map(this.favouritesMapSubject.getValue())

        if (!map.get(key)) {
            map.set(key, new Map([[message.id, message]]))
        } else {
            map.get(key)!.set(message.id, message)
        }
        this.favouritesMapSubject.next(map)
        this.saveFavourites()
    }

    public removeFromFavourites(message: WhatsappMessage): void {
        const key = DateUtils.messageToYearMonthString(message)
        const map = new Map(this.favouritesMapSubject.getValue())

        if (map.get(key)?.has(message.id)) {
            map.get(key)!.delete(message.id)
            console.log(
                `favourites-service: removed message with id ${message.id} from ${key}`
            )
            if (map.get(key)?.size === 0) {
                map.delete(key)
                console.log(
                    `favourites-service: removed yearDate ${key} as it contains no messages`
                )
            }
            this.favouritesMapSubject.next(map)
            this.saveFavourites()
        }
    }

    public clearFavourites(): void {
        this.favouritesMapSubject.next(
            new Map<string, Map<string, WhatsappMessage>>()
        )
        this.saveFavourites()
    }

    /*     public downloadFavouritedMessages(): void {
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
        } */

    private favouritesApiGetFavourites(): Observable<
        Map<string, Map<string, WhatsappMessage>>
    > {
        console.log('Fetching data from backend:', this.favouritesApiUrl)
        return this.http
            .get<any>(this.favouritesApiUrl, { headers: this.headers })
            .pipe(
                map(
                    (
                        parsedData:
                            | [string, [string, WhatsappMessage][]][]
                            | null
                    ) => {
                        if (!parsedData || !Array.isArray(parsedData)) {
                            return new Map<
                                string,
                                Map<string, WhatsappMessage>
                            >()
                        }
                        return new Map(
                            parsedData.map(([key, innerArray]) => [
                                key,
                                new Map(innerArray)
                            ])
                        )
                    }
                )
            )
    }

    private favouritesApiPostFavourites(
        data: Map<string, Map<string, WhatsappMessage>>
    ) {
        console.log('Saving data to backend:', this.favouritesApiUrl)
        const serializedData = Array.from(data, ([key, innerMap]) => [
            key,
            Array.from(innerMap)
        ])
        return this.http.post(this.favouritesApiUrl, serializedData, {
            headers: this.headers
        })
    }

    private saveFavourites(): void {
        this.favouritesApiPostFavourites(
            this.favouritesMapSubject.getValue()
        ).subscribe({
            next: (response) => console.log('Save successful:', response),
            error: (error) => console.error('Save failed:', error)
        })
    }
}
