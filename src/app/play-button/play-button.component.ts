import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core'
import { AudioService } from '../services/audio.service'

@Component({
    selector: 'app-play-button',
    templateUrl: './play-button.component.html',
    styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent implements OnChanges {
    @Input() durationInput!: number
    @Input() fileNameInput!: string
    @Output() playButtonClicked = new EventEmitter()
    @Output() pauseButtonClicked = new EventEmitter()

    public isPlaying: boolean
    public duration!: number

    constructor(private audioService: AudioService) {
        this.isPlaying = false
    }

    ngOnChanges(): void {
        // use property binding instead... [duration]="durationInput"
        this.duration = this.durationInput
    }

    public handleClick(): void {
        if (this.isPlaying) {
            console.info('pause button clicked')
            this.audioService.pauseVoiceNote()
        } else {
            console.info('play button clicked')
            var filePath = 'assets/audio/' + this.fileNameInput.match(/[^/]+$/)
            console.log(filePath)
            this.audioService.playVoiceNote(filePath)
        }
        this.isPlaying = !this.isPlaying
    }
}
