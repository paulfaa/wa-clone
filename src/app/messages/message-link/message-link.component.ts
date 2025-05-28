import { Component, Input, OnInit } from '@angular/core'
import { WhatsappMessage } from 'src/app/models/models'

@Component({
    selector: 'app-message-link',
    templateUrl: './message-link.component.html',
    styleUrls: ['./message-link.component.scss']
})
export class MessageLinkComponent {
    @Input() messageInput!: WhatsappMessage
}
