import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { FavouritesService } from './favourites.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MessageParsingService {

  //public onParseComplete: EventEmitter<ParseEvent> = new EventEmitter<ParseEvent>();
  private messages: Message[];
  chatOwner: string = '';
  participant: string = '';
  chatMembers: string[];
  isGroupChat: boolean;
  messageCount: number;

  // everything after nth character:
  //   (?<=^.{n}).* 

  //add function called once to get index of userName to get substring each time
  //instead of using regex on each line
  //then compare subsequent to stored userName

  constructor(private messageService: MessageService, private favouritesService: FavouritesService) {
    this.messages = [];
    this.chatMembers = [];
    this.isGroupChat = false;
    this.messageCount = 0;
  }

  public getAllMessages() {
    return this.messages;
  }

  private addChatMember(member: string): void {
    if (!this.chatMembers.includes(member)) {
      this.chatMembers.push(member);
    }
  }

  private checkIsFavourite(message: Message): void{
    if(this.favouritesService.isFavourite(message)){
      message.$isFavourite = true;
    }
  }

  public parseJson(jsonString: string) {
      let jsonObj = JSON.parse(jsonString);
      this.messageCount = Object.keys(jsonObj.chats[0].messages).length
      this.messages = jsonObj.chats[0].messages.map(
        (item: { timestamp: any; fromMe: any; text: any }) => {
          var msg = {
            timestamp: item.timestamp,
            fromMe: item.fromMe,
            text: item.text,
          };
          this.checkIsFavourite(msg);
          this.messageService.addMessage(msg);
        }
      );
      console.log('Messaged parsed by service: ', this.messages);
  }

  public parseText(text: string): void {
    //look at first char of text and determine format
    const firstChar = text[0];
    if (firstChar == "[") {
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
      if (member !== undefined && !m.includes(member)) {
        m.push(member);
      }
    }

    if (m.length > 2) {
      this.isGroupChat = true;
    }
    return m;
  }

  public parseNewFormat(text: string): void {
    var lines: string[] = text.split(("\n"));
    lines.forEach(line => {
      // if line is not a new message, append to previous
      if (line[0] && line[0] !== "[" && line[19] !== "]") {
        console.log("0: " + line[0])
        console.log("19: " + line[19])
        console.log("Appending to prev message");
        var splitLines = line.split(":");
        splitLines = splitLines.slice(3);
        const contents = splitLines.join(":").trimStart();
        var previousContents = this.messages[this.messages.length - 1].text;
        previousContents = previousContents + contents;
      }
      else {
        var splitLines = line.split(":");
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
        this.messages.push(new Message(date, isChatOwner, messageContents));
      }
    });
  }

  public parseOldFormat(text: string): void {
    var lines: string[] = text.split(("\n"));
    lines.forEach(line => {
      console.log("splitLine: " + line)
      if (line[0] == "2" && line[1] == "0" && line[2] == "1") {
        const date = line.substring(0, 10).split(".").map(function (d) {
          return parseInt(d);
        });
        console.log("Dates: " + date)
        const time = line.substring(13, 21).split(":").map(function (t) {
          return parseInt(t);
        });
        const messageDate = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        console.log("date set in service: " + messageDate)
        const author = line.slice(23).split(":")[0]
        const contents = line.slice(24 + author.length).trimStart();
        const isChatOwner = author == this.chatOwner;
        this.messages.push(new Message(messageDate, isChatOwner, contents));
      }
      //if line is not a new message, append to previous
      else {
        this.messages[this.messages.length - 1].text = this.messages[this.messages.length - 1].text + line;
      }
    });
  }
}
