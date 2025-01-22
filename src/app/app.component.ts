import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { FavouritesDialogComponent } from './favourites-dialog/favourites-dialog.component'
import { FavouritesService } from './services/favourites.service'
import { MessageService } from './services/message.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private messageService: MessageService,
        private dialog: MatDialog,
        private favouritesService: FavouritesService
    ) {}

    ngOnInit(): void {
        this.router.navigate([''])
    }

    public isViewRoute() {
        return this.router.url === '/view'
    }

    public callClearMessages(): void {
        if (this.isViewRoute()) {
            this.messageService.clearAllMessages()
        }
    }

    public openFavouritesDialog(): void {
        const savedFavourites = Array.from(
            this.favouritesService
                .getAllFavourites()
                .sort(
                    (a, b) =>
                        new Date(b.timestamp).getTime() -
                        new Date(a.timestamp).getTime()
                )
        )
        this.dialog.open(FavouritesDialogComponent, {
            width: '80%',
            data: savedFavourites,
            position: { top: '150px' },
        })
    }
}
