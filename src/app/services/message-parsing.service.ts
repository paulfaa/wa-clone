import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageParsingService {

  private messages: Message[];
  chatOwner: string = '';
  chatMembers: string[];
  useOldFormat: boolean;
  isGroupChat: boolean;

  // everything after nth character:
  //   (?<=^.{n}).* 

  //add function called once to get index of userName to get substring each time
  //instead of using regex on each line
  //then compare subsequent to stored userName

  constructor() {
    this.messages = [];
    this.chatMembers = [];
    this.useOldFormat = false;
    this.isGroupChat = false;
   }

  public getAllMessages(){
    return this.messages;
  }

  private addChatMember(member: string): void{
    if (!this.chatMembers.includes(member)){
      this.chatMembers.push(member);
    }
  }

  public parseJson(jsonString: string) {
    let jsonObj = JSON.parse(jsonString);
    const name = jsonObj.chats[0].contactName;
    console.log(jsonObj.chats[0].messages)
  }
  
  public parseText(text: string): void {
    //look at first char of text and determine format
    const firstChar = text[0];
    if (firstChar == "["){
      this.parseNewFormat(text);
    }
    else {
      this.parseOldFormat(text);
    }
  }

  public getAllChatMembers(members: string[]): string[] {
    var m: string[] = [];
    for (let index = 0; index < members.length; index++) {
      const member = members[index];
      if (member !== undefined && !m.includes(member)){
        m.push(member);
      }
    }
      
    if(m.length > 2){
      this.isGroupChat = true;
    }
    return m;
  }

  public parseNewFormat(text: string): void {
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

  public parseOldFormat(text: string): void {
    var lines: string[] = text.split(("\n"));
    lines.forEach(line => {
      console.log("splitLine: " + line)
      if (line[0] == "2" && line[1] == "0" && line[2] == "1"){
        const date = line.substring(0,10).split(".").map(function(d) {
          return parseInt(d);
        });
        console.log("Dates: " + date)
        const time = line.substring(13,21).split(":").map(function(t) {
          return parseInt(t);
        });
        const messageDate = new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2]);
        console.log("date set in service: " + messageDate)
        const author = line.slice(23).split(":")[0]
        const contents = line.slice(24 + author.length).trimStart();
        const isChatOwner = author == this.chatOwner;
        this.messages.push(new Message(messageDate, author, contents, isChatOwner));
      }
      //if line is not a new message, append to previous
      else{
        this.messages[this.messages.length-1].messageContents = this.messages[this.messages.length-1].messageContents + line;
      }
    });
  }
}
