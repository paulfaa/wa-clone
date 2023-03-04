export default class StorageUtils {
    static writeToStorage(keyName: string, dataToSave: any){
        //localStorage.setItem(keyName, JSON.stringify(Array.from(dataToSave)));
        localStorage.setItem(keyName, JSON.stringify(dataToSave));
    }

    static readFromStorage(keyName: string): any{
        try{
            const data = localStorage.getItem(keyName);
            if(data != null || data != undefined || data != "undefined"){
                console.log("Stored data for key " +  keyName + ": " + data);
                //const map = new Map(JSON.parse(data!));
                //return map
                return JSON.parse(data!);
            }
            else{
                console.log("Nothing in local storage with key " + keyName);
                return null;
            }
        }
        catch(e){
            console.log('Error reading from storage: ', e);
        }
    }

    static deleteFromStorage(keyName: string): void{
        try{
            localStorage.removeItem(keyName);
        }
        catch(e){
            console.log('Error deleting from storage: ', e);
        }
    }

    static clearAllStorage(): void {
        localStorage.clear();
    }
}