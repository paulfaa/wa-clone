import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  date: Date;
  sentByMe: boolean;

  constructor() { 
    this.date = new Date();
    this.sentByMe = true;
  }

  ngOnInit(): void {
  }

}
