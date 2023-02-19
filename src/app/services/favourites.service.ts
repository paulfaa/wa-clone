import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import StorageUtils from '../util/storage-util';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private favourites: Message[];

  constructor() {
    this.favourites = []; 
    this.initService();
  }

  private initService(): void{
    var favourites = StorageUtils.readFromStorage('favourites');
    if (favourites === null){ 
      console.log('init method setting favourites to empty list')
      this.favourites = [];
    }
    else {
      console.log('setting this.favourites to ' + favourites)
      this.favourites = StorageUtils.readFromStorage('favourites');
    }
  }

  public getFavourites(): Message[]{
    return this.favourites;
  }

  public isFavourite(message: Message){
    return this.favourites.includes(message);
  }

  public addToFavourites(m: Message){
    console.log("Adding message " + m.text + "to favourites");
    this.favourites.push(m);
    this.sortFavourites();
    this.updateStorage();
  }

  public removeFromFavourites(m: Message){
    if(this.favourites.includes(m)){
      this.favourites.filter(item => item !== m)
    }
    this.updateStorage();
  }

  private sortFavourites(): void{
    if(this.favourites != null && this.favourites.length >= 2){
      this.favourites.sort((a,b) => b.timestamp.valueOf() - a.timestamp.valueOf());
    }
  }

  public clearFavourites(): void{
    this.favourites.length = 0;
    this.updateStorage();
  }

  private updateStorage(): void{
    StorageUtils.writeToStorage('favourites', this.favourites)
  }

}
