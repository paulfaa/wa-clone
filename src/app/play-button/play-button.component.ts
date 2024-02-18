import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {
  @Input() durationInput!: number;
  @Output() playButtonClicked = new EventEmitter();
  @Output() pauseButtonClicked = new EventEmitter();

  public isPlaying: boolean;
  public duration!: number;

  constructor() {
    this.isPlaying = false;
  }

  ngOnChanges(): void {
    this.duration = this.durationInput;
  }

  public handleClick(): void{
    if(this.isPlaying){
      this.pauseButtonClicked.emit();
    }
    else{
      this.playButtonClicked.emit();
    }
    this.isPlaying = !this.isPlaying;
  }
}
