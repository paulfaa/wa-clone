import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import StorageUtils from '../util/storage-util';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private favouritesMap : Map<number, Message>;
  private fileName: string | undefined;

  constructor() {
    this.favouritesMap = new Map<number, Message>(); 
  }

  public initStorage(currentFileName: string): void{
    if(currentFileName != null && currentFileName != undefined && currentFileName != ""){
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

  public getFavourites(): Map<number, Message>{
    return this.favouritesMap;
  }

  public isFavourite(id: number){
    return this.favouritesMap.has(id);
  }

  public addToFavourites(m: Message){
    this.favouritesMap.set(m.id!, m);
    this.updateStorage();
  }

  public removeFromFavourites(id: number){
    if(this.favouritesMap.has(id)){
      console.log("Removing message id " + id + " from favourites");
      this.favouritesMap.delete(id);
    }
    this.updateStorage();
  }

  public clearFavourites(): void{
    this.favouritesMap = new Map<number, Message>();
    this.updateStorage();
  }

  private updateStorage(): void{
    this.favouritesMap = new Map([...this.favouritesMap].sort());
    StorageUtils.writeToStorage(this.fileName + '.favourites', this.favouritesMap)
  }
}