import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageParsingService {

  private messages: Message[];
  chatOwner: string = '';
  useOldFormat: boolean;

  //add function called once to get index of userName to get substring each time
  //instead of using regex on each line
  //then compare subsequent to stored userName

  constructor() {
    this.messages = [];
    this.useOldFormat = false;
   }

  public getAllMessages(){
    return this.messages;
  }

  private getAllChatMembers(): string[]{
    var members: string[] = [];
    //look at first x lines of chat and add unique members to array
    return members;
  }
  
  private checkIsNewFormat(text: string): boolean {
    //look at first char of text and determine format
    if (text[0] == "["){
      return true;
    }
    else {return false}
  }

  public parse(text: string): void {
    var lines: string[] = text.split(("\n"));
    lines.forEach(line => {
      var splitLine  = line.split(":");
      var date = new Date(line.substring(1, 9));
      const timeString = line.substring(11, 19).split(":");
      date.setHours(parseInt(timeString[0]));
      date.setMinutes(parseInt(timeString[1]));
      date.setSeconds(parseInt(timeString[2]));
      const author = splitLine[2].slice(4);
      splitLine = splitLine.slice(3);
      const messageContents = splitLine.join(":").trimStart();
      const isChatOwner = author?.toString() == this.chatOwner;
      this.messages.push(new Message(date, author, messageContents, isChatOwner));
    });
  }

  public parseOldFormat(text: string): void {
    var lines: string[] = text.split(/\r?\n/);
    //const contentsRegex = new RegExp("\?.*");
    //const senderRegex = new RegExp("\?.*");
    lines.forEach(line => {
      var date = new Date(line.substring(0,7));
      const time = new Date (line.substring(10, 15));
      date.setTime(time.getTime()); 
      //const sender = line.match(senderRegex)
      //const messageContents = line.match(contentsRegex);
      //const isChatOwner = sender?.toString() == this.chatOwner;
      //this.messages.push(new Message(date, sender!.toString(), messageContents!.toString(), isChatOwner));
    });
  }


}
