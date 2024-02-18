import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  public playVoiceNote(pathToFile: string): void {
    console.warn("pathToFile ", pathToFile);
    this.audio.src = pathToFile;
    this.audio.load();
    this.audio.play();
    //this.audio.onpause...
    //need to emit event once playback complete to update pause isPlaying bool in button component
    //https://stackoverflow.com/questions/5092266/is-there-an-oncomplete-event-for-html5-audio
  }

  public pauseVoiceNote(): void {
    this.audio.pause();
  }
}
