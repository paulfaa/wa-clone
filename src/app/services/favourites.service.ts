import { Injectable } from '@angular/core';
import StorageUtils from '../util/storage-util';
import { WhatsappMessage } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private favouritesMap : Map<string, WhatsappMessage>;
  private fileName: string | undefined;
  private areFavouritesModified = false;

  constructor() {
    this.favouritesMap = new Map<string, WhatsappMessage>(); 
  }

  public initStorage(currentFileName: string): void{
    if(currentFileName && currentFileName != ""){
      this.fileName = currentFileName;
      var favourites = StorageUtils.readFromStorage(currentFileName + '.favourites');
      if (favourites != null){ 
        console.log('setting this.favourites to ' + favourites)
        this.favouritesMap = StorageUtils.readFromStorage(currentFileName + '.favourites');
      }
      else{
        console.log("no saved data found")
      }
    }
  }

  public getFavourites(): Map<string, WhatsappMessage>{
    return this.favouritesMap;
  }

  public isFavourite(id: string){
    return this.favouritesMap.has(id);
  }

  public addToFavourites(message: WhatsappMessage){
    this.favouritesMap.set(message.id, message);
    this.updateStorage();
  }

  public removeFromFavourites(id: string){
    if(this.favouritesMap.has(id)){
      console.log("Removing message id " + id + " from favourites");
      this.favouritesMap.delete(id);
    }
    this.updateStorage();
  }

  public clearFavourites(): void{
    this.favouritesMap = new Map<string, WhatsappMessage>();
    this.updateStorage();
  }

  public downloadFavouritedMessages(): void{
    if(this.areFavouritesModified){
      const messageArray = Array.from(this.favouritesMap.values()).map(msg => ({
        id: msg.id,
        date: msg.timestamp,
        contents: msg.text
      }));
      const jsonData = JSON.stringify(messageArray, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = this.fileName + '_msg.json';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      window.URL.revokeObjectURL(url);
      anchor.remove();
    }
  }

  private updateStorage(): void{
    const entriesArray = Array.from(this.favouritesMap.entries());
    entriesArray.sort(([, msgA], [, msgB]) => {
        return new Date(msgB.timestamp).getTime() - new Date(msgA.timestamp).getTime();
    });
    this.favouritesMap = new Map(entriesArray);
    StorageUtils.writeToStorage(this.fileName + '.favourites', this.favouritesMap)
    this.areFavouritesModified = true;
  }
}