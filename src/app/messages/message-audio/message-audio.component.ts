import { Component, Input, OnInit } from '@angular/core'
import { WhatsappMessage } from 'src/app/models/models'

@Component({
    selector: 'app-message-audio',
    templateUrl: './message-audio.component.html',
    styleUrls: ['./message-audio.component.scss']
})
export class MessageAudioComponent {
    @Input() messageInput!: WhatsappMessage
}
