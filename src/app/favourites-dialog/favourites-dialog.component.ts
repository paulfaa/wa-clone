import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MessageParsingService } from '../services/message-parsing.service'
import { WhatsappMessage } from '../models/models'
import { StorageService } from '../services/storage.service'

@Component({
    selector: 'app-favourites-dialog',
    templateUrl: './favourites-dialog.component.html',
    styleUrls: ['./favourites-dialog.component.scss'],
})
export class FavouritesDialogComponent implements OnInit {
    public fileName: string | undefined
    public favourites: WhatsappMessage[]

    constructor(
        private storageService: StorageService,
        public dialogRef: MatDialogRef<FavouritesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: WhatsappMessage[]
    ) {
        this.favourites = data
    }

    ngOnInit(): void {
        this.fileName = this.storageService.getFileName()
        console.info('Filename: ', this.fileName)
    }

    public closeDialog(): void {
        this.dialogRef.close()
    }

    public scrollToMessage(messageId: string) {
        this.closeDialog()
        setTimeout(() => {
            try {
                if (messageId) {
                    console.log(messageId)
                    let el = document.getElementById(messageId.toString())
                    console.log(el)
                    el?.scrollIntoView({ behavior: 'smooth' })
                }
            } catch (e) {
                console.log('Element not found on page' + e)
                throw e
            }
        }, 2500)
    }
}
