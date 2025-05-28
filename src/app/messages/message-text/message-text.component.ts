import { Component, Input, OnInit } from '@angular/core'
import { WhatsappMessage } from 'src/app/models/models'

@Component({
    selector: 'app-message-text',
    templateUrl: './message-text.component.html',
    styleUrls: ['./message-text.component.scss']
})
export class MessageTextComponent {
    @Input() messageInput!: WhatsappMessage
}
