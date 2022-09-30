import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageParsingService {

  messages: Message[] = [];
  userName: string = '';

  //function called once to get index of userName to get substring each time
  //instead of using regex on each line
  //then compare subsequent to stored userName

  constructor() { }

  public parseFile(text: string): void{
    var lines: string[] = [];
    lines.forEach(line => {
      const date = new Date(line.substring(1, 8));
      //const time = new Date(line.substring(11, 18));
      const time = line.substring(11, 18);
      const isUser = true;
      this.messages.push(new Message(date, time, isUser))
    });
  }

 
}
