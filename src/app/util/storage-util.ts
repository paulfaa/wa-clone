import { WhatsappMessage } from '../models/models'

export default class StorageUtils {
    static writeToStorage(
        keyName: string,
        dataToSave: Map<string, Map<string, WhatsappMessage>>
    ) {
        const serializedData = Array.from(dataToSave, ([key, innerMap]) => [
            key,
            Array.from(innerMap),
        ])
        localStorage.setItem(keyName, JSON.stringify(serializedData))
    }

    static readFromStorage(
        keyName: string
    ): Map<string, Map<string, WhatsappMessage>> | null {
        try {
            const data = localStorage.getItem(keyName)
            if (data && data !== 'undefined') {
                console.log('Stored data for key ' + keyName + ': ' + data)

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
                console.log('Nothing in local storage with key ' + keyName)
                return null
            }
        } catch (e) {
            console.error('Error reading from storage: ', e)
            return null
        }
    }

    static deleteFromStorage(keyName: string): void {
        try {
            localStorage.removeItem(keyName)
        } catch (e) {
            console.log('Error deleting from storage: ', e)
        }
    }

    static clearAllStorage(): void {
        localStorage.clear()
    }
}
