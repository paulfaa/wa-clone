import { Component, Input, OnInit } from '@angular/core'
import { WhatsappMessage } from 'src/app/models/models'

@Component({
    selector: 'app-message-image',
    templateUrl: './message-image.component.html',
    styleUrls: ['./message-image.component.scss']
})
export class MessageImageComponent implements OnInit {
    @Input() messageInput!: WhatsappMessage

    src: string | undefined
    imageError: boolean = false

    ngOnInit(): void {
        const basePath = this.messageInput.fromMe
            ? 'assets/sent/'
            : 'assets/received/'
        this.src = `${basePath}${this.messageInput.filename}`
    }

    onImageError(event: Event): void {
        const filename = this.messageInput.filename
        console.error(
            `Failed to load image with filename "${filename}":`,
            event
        )
        this.imageError = true
    }
}
