import { Component, Input, OnInit } from '@angular/core'
import { WhatsappMessage } from 'src/app/models/models'

@Component({
    selector: 'app-message-location',
    templateUrl: './message-location.component.html',
    styleUrls: ['./message-location.component.scss']
})
export class MessageLocationComponent implements OnInit {
    @Input() messageInput!: WhatsappMessage

    public googleMapsUrl: string = ''

    ngOnInit(): void {
        this.buildLocationUrl(this.messageInput.location!)
    }

    private buildLocationUrl(location: string): string {
        return `https://www.google.com/maps/search/?api=1&query=${location}`
    }
}
