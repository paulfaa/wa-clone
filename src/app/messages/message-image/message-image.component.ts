import { Component, Input, OnInit } from '@angular/core'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { WhatsappMessage } from 'src/app/models/models'

@Component({
    selector: 'app-message-image',
    templateUrl: './message-image.component.html',
    styleUrls: ['./message-image.component.scss']
})
export class MessageImageComponent implements OnInit {
    @Input() messageInput!: WhatsappMessage

    src: string | SafeUrl | undefined
    imageError: boolean = false

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        if (this.messageInput.filename) {
            const basePath = this.messageInput.fromMe
                ? 'assets/sent/'
                : 'assets/received/'
            this.src = `${basePath}${this.messageInput.filename}`
        } else if (!this.messageInput.filename && this.messageInput.image) {
            this.src = this.getSanitizedImageUrl(this.messageInput.image)
        } else {
            this.imageError = true
        }
    }

    private getSanitizedImageUrl(base64: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(
            `data:image/jpeg;base64,${base64}`
        )
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
