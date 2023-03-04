import { Message } from "../models/message";

export class MessageBuilder {
    private readonly message : Message = new Message(new Date, false, "");

    constructor() {
        this.message = {
          timestamp: new Date,
          fromMe: false,
          text: ""
        };
      }
  
      id(id: number): MessageBuilder {
        this.message.id = id;
        return this;
      }
      
      timestamp(timestamp: Date): MessageBuilder {
        this.message.timestamp = timestamp;
        return this;
      }

      fromMe(fromMe: boolean): MessageBuilder {
        this.message.fromMe = fromMe;
        return this;
      }

      type(type: string): MessageBuilder {
        this.message.$type = type;
        return this;
      }

      text(text: string): MessageBuilder {
        this.message.text = text;
        return this;
      }

      isFavourite(isFavourite: boolean): MessageBuilder {
        this.message.$isFavourite = isFavourite;
        return this;
      }
    
      build(): Message {
        return this.message;
      }
  }