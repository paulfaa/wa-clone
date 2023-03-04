import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import StorageUtils from '../util/storage-util';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  //private favouritesMap = Map<number, Message>;
  private favourites: Message[];
  private fileName: string | undefined;

  constructor() {
    this.favourites = []; 
  }

  public initStorage(currentFileName: string): void{
    if(currentFileName != null && currentFileName != undefined && currentFileName != ""){
      this.fileName = currentFileName;
      var favourites = StorageUtils.readFromStorage(currentFileName + '.favourites');
      if (favourites === null){ 
        console.log('init method setting favourites to empty list')
        this.favourites = [];
      }
      else {
        console.log('setting this.favourites to ' + favourites)
        this.favourites = StorageUtils.readFromStorage(currentFileName + '.favourites');
      }
    }
  }

  public getFavourites(): Message[]{
    return this.favourites;
  }

  public isFavourite(message: Message){
    return this.favourites.includes(message);
  }

  public addToFavourites(m: Message){
    if(!this.favourites.includes(m)){
      console.log("Adding message " + m.text + "to favourites");
      this.favourites.push(m);
      this.sortFavourites();
      this.updateStorage();
    }
    else{
      console.log("Message already exists in favourites");
    }
  }

  public removeFromFavourites(m: Message){
    if(this.favourites.includes(m)){
      this.favourites.filter(item => item !== m)
    }
    this.updateStorage();
  }

  private sortFavourites(): void{
    try{
      if(this.favourites != null && this.favourites.length >= 2){
        this.favourites.sort((a,b) => b.id! - a.id!);
      }
    }
    catch(e){
      console.log("Can't sort due to missing ID" + e);
      throw(e);
    }
    
  }

  public clearFavourites(): void{
    this.favourites.length = 0;
    this.updateStorage();
  }

  private updateStorage(): void{
    StorageUtils.writeToStorage(this.fileName + '.favourites', this.favourites)
  }

}
