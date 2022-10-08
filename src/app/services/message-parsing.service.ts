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

  private getAllChatMembers(linesToReview: number, lines: string[]): string[] {
    var members: string[] = [];
    for (let index = 0; index < linesToReview; index++) {
      const element = lines[index];
      if (!members.includes(element)){
        members.push(element);
      }
    }
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
    var lines: string[] = text.split(("\n"));
    lines.forEach(line => {
      var splitLine  = line.split(":");
      var date = new Date(line.substring(0,7));
      const timeStamp = line.substring(10, 15).split("/");
      date.setHours(parseInt(timeStamp[0]));
      date.setMinutes(parseInt(timeStamp[1]));
      date.setSeconds(parseInt(timeStamp[2]));
      const author = splitLine[2].slice(4);
      splitLine = splitLine.slice(3);
      const messageContents = splitLine.join(":").trimStart();
      const isChatOwner = author?.toString() == this.chatOwner;
      this.messages.push(new Message(date, author, messageContents, isChatOwner));
    });
  }
}
