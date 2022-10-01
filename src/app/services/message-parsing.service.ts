import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageParsingService {

  messages: Message[] = [];
  chatOwner: string = '';
  useOldFormat = false;

  //add function called once to get index of userName to get substring each time
  //instead of using regex on each line
  //then compare subsequent to stored userName

  constructor() { }

  public getAllMessages(){
    return this.messages;
  }

  private getAllChatMembers(): string[]{
    var members: string[] = [];
    //look at first x lines of chat and add unique members to array
    return members;
  } 

  public parse(text: string): void {
    var lines: string[] = [];
    const contentsRegex = new RegExp("\?.*");
    const senderRegex = new RegExp("\?.*");
    lines.forEach(line => {
      //might be more efficient to trim string
      var date = new Date(line.substring(1, 8));
      const time = new Date (line.substring(11, 18));
      date.setTime(time.getTime());
      const sender = line.match(senderRegex)
      const messageContents = line.match(contentsRegex);
      const isChatOwner = sender?.toString() == this.chatOwner;
      this.messages.push(new Message(date, sender!.toString(), messageContents!.toString(), isChatOwner));
    });
  }

  public parseOldFormat(text: string): void {
    var lines: string[] = [];
    const contentsRegex = new RegExp("\?.*");
    const senderRegex = new RegExp("\?.*");
    lines.forEach(line => {
      var date = new Date(line.substring(0,7));
      const time = new Date (line.substring(10, 15));
      date.setTime(time.getTime()); 
      const sender = line.match(senderRegex)
      const messageContents = line.match(contentsRegex);
      const isChatOwner = sender?.toString() == this.chatOwner;
      this.messages.push(new Message(date, sender!.toString(), messageContents!.toString(), isChatOwner));
    });
  }


}
