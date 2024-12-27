import { Injectable } from '@angular/core';
import { FavouritesService } from './favourites.service';
import { MessageService } from './message.service';
import { Chat, WhatsappMessage } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MessageParsingService {

  //public onParseComplete: EventEmitter<ParseEvent> = new EventEmitter<ParseEvent>();
  private yearMonthMap : Map<number, Set<number>>;
  private quoteIds: Set<string>;
  private filenameRegex: RegExp = /([^\/]+$)/;
  chatOwner: string = '';
  participant: string = '';
  chatMembers: string[];
  isGroupChat: boolean;
  messageCount: number;

  constructor(private messageService: MessageService, private favouritesService: FavouritesService) {
    this.chatMembers = [];
    this.isGroupChat = false;
    this.messageCount = 0;
    this.yearMonthMap = new Map<number, Set<number>>();
    this.quoteIds = new Set<string>();
  }

  public getYearMonthMap(){
    return this.yearMonthMap;
  }

  private addChatMember(member: string): void {
    if (!this.chatMembers.includes(member)) {
      this.chatMembers.push(member);
    }
  }

  private checkIsFavourite(id: string): boolean {
    return this.favouritesService.isFavourite(id);
  }

  private populateYearMonthMap(timestamp: Date): void {
    try{
      //can just use existing timestamp instead of creating new one
      let dateObject = new Date(timestamp);
      let year = dateObject.getFullYear();
      let month = dateObject.getMonth() + 1; //?
      let storedMonths = this.yearMonthMap.get(year);
      if (!storedMonths) {
          this.yearMonthMap.set(year, new Set([month]));
      } else {
          storedMonths.add(month);
      }
    }
    catch(error){
      console.error("Failed to populate yearMonthMap: ", error)
    }
}

  private formatFilename(filename?: string): string | undefined {
    const match = filename?.match(this.filenameRegex);
    if(match){
      return match[0];
    }
    else {
      return undefined
    }
  }

  public parseJsonString(json: string): void {
    var parsedJson = JSON.parse(json);
    var messages: WhatsappMessage[] = [];
    try{
      parsedJson = JSON.parse(json);
    } catch(error){
      throw("Failed to parse JSON: " + error)
    }
    if (parsedJson.chats) {
      messages = parsedJson.chats[0].messages.reverse();
    } else if (parsedJson.messages) {
      messages = parsedJson.messages.reverse();
    } else {
      throw(new Error("Invalid chat format"))
    }
    messages.forEach((msg: WhatsappMessage) => {
      if(msg.filename){
        msg.filename = this.formatFilename(msg.filename);
      }
      if(msg.quotedMessageId){
        this.quoteIds.add(msg.quotedMessageId);
      }
      msg.timestamp = new Date(msg.timestamp);
      this.populateYearMonthMap(msg.timestamp);
    })
    this.messageService.addMessages(messages.reverse())
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
}
