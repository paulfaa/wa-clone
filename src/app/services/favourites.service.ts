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
    var storedCoins = StorageUtils.readFromStorage('savedCoins');
    if (storedCoins === null){ 
      console.log('init method setting heldcoins and uniquetickers to empty list')
      this.favourites = [];
    }
    else {
      console.log('setting this.heldcoins to ' + storedCoins)
      this.favourites = StorageUtils.readFromStorage('uniqueTickers');
    }
  }

  public getFavourites(): Message[]{
    return this.favourites;
  }

  public addToFavourites(m: Message){
    this.favourites.push(m);
    this.sortFavourites();
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
