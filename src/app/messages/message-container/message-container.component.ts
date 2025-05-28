import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { WhatsappMessage } from 'src/app/models/models'

@Component({
    selector: 'app-message-container',
    templateUrl: './message-container.component.html',
    styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit {
    @Input() messageInput!: WhatsappMessage
    @Input() isQuote: boolean = false
    @Output() toggleFavouriteEvent: EventEmitter<WhatsappMessage> =
        new EventEmitter()

    isFavourite: boolean = false

    ngOnInit(): void {
        if (this.messageInput.isFavourite) {
            this.isFavourite = this.messageInput.isFavourite
        } else {
            this.messageInput.isFavourite = false
        }
    }

    public toggleFavourite(): void {
        console.log('id of message clicked: ', this.messageInput.id)
        this.isFavourite = !this.isFavourite
        this.toggleFavouriteEvent.emit(this.messageInput)
    }
}
