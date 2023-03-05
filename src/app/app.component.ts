import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FavouritesDialogComponent } from './favourites-dialog/favourites-dialog.component';
import { FavouritesService } from './services/favourites.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router,
              private messageService: MessageService,
              private dialog: MatDialog,
              private favouritesService: FavouritesService
  ){}

  public isViewRoute() {
    return this.router.url === '/view';
  }

  public callClearMessages(): void{
    if(this.isViewRoute()){
      this.messageService.clearAllMessages();
    }
  }

  public openFavouritesDialog(): void {
    var savedFavourites = Array.from(this.favouritesService.getFavourites().values());
    let dialogRef = this.dialog.open(FavouritesDialogComponent, {
      width: '80%',
      data: savedFavourites,
      position: {top: '150px'} 
    });
  
    dialogRef.afterClosed().subscribe(() => {});
  } 
}
