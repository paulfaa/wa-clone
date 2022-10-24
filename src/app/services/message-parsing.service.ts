import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageParsingService {

  private messages: Message[];
  chatOwner: string = '';
  useOldFormat: boolean;
  isGroupChat: boolean;

  //add function called once to get index of userName to get substring each time
  //instead of using regex on each line
  //then compare subsequent to stored userName

  constructor() {
    this.messages = [];
    this.useOldFormat = false;
    this.isGroupChat = false;
   }

  public getAllMessages(){
    return this.messages;
  }

  public getAllChatMembers(linesToReview: number, lines: string[]): string[] {
    var members: string[] = [];
    for (let index = 0; index < linesToReview; index++) {
      const element = lines[index];
      if (!members.includes(element)){
        members.push(element);
      }
    }
    if(members.length > 2){
      this.isGroupChat = true;
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
      // if line is not a new message, append to previous
      if (line[0] && line[0] !== "[" && line[19] !== "]"){
        console.log("0: " + line[0])
        console.log("19: " + line[19])
        console.log("Appending to prev message");
        var splitLines  = line.split(":");
        splitLines = splitLines.slice(3);
        const contents = splitLines.join(":").trimStart();
        var previousContents = this.messages[this.messages.length - 1].messageContents;
        previousContents = previousContents + contents;
      }
      else{
        var splitLines  = line.split(":");
        console.log("splitlines: " + splitLines)
        var date = new Date(line.substring(1, 9));
        const timeString = line.substring(11, 19).split(":");
        date.setHours(parseInt(timeString[0]));
        date.setMinutes(parseInt(timeString[1]));
        date.setSeconds(parseInt(timeString[2]));
        console.log("2: " + splitLines[2])
        console.log("slice: " + splitLines[2].slice(4))
        const author = splitLines[2].slice(4);
        splitLines = splitLines.slice(3);
        const messageContents = splitLines.join(":").trimStart();
        const isChatOwner = author?.toString() == this.chatOwner;
        this.messages.push(new Message(date, author, messageContents, isChatOwner));
      }
    });
  }

  //needs rewrite. maybe allow user to input correct date format
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
