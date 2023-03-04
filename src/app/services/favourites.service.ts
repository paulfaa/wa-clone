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
      if (favourites === null){ 
        console.log('init method setting favourites to empty map')
        //this.favouritesMap = [];
      }
      else {
        console.log('setting this.favourites to ' + favourites)
        this.favouritesMap = StorageUtils.readFromStorage(currentFileName + '.favourites');
      }
    }
  }

  public getFavourites(): Map<number, Message>{
    return this.favouritesMap;
  }

  public isFavourite(id: number){
    return this.favouritesMap.has(id);
  }

  public addToFavourites(id: number, m: Message){
    if(!this.favouritesMap.has(id)){
      console.log("Adding message " + m.text + "to favourites");
      this.favouritesMap.set(id, m);
      //this.sortFavourites();
      this.updateStorage();
    }
    else{
      console.log("Message already exists in favourites");
    }
  }

  public removeFromFavourites(id: number){
    if(this.favouritesMap.has(id)){
      this.favouritesMap.delete(id);
    }
    this.updateStorage();
  }

  /* private sortFavourites(): void{
    try{
      if(this.favouritesMap != null && this.favouritesMap.length >= 2){
        this.favouritesMap.sort((a,b) => b.id! - a.id!);
      }
    }
    catch(e){
      console.log("Can't sort due to missing ID" + e);
      throw(e);
    }
  } */

  public clearFavourites(): void{
    this.favouritesMap = new Map<number, Message>();
    this.updateStorage();
  }

  private updateStorage(): void{
    StorageUtils.writeToStorage(this.fileName + '.favourites', this.favouritesMap)
  }

}
