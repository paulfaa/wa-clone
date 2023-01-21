import { Message } from "../models/message";

export class ParseEvent {
    message: Message;

    constructor(m: Message){
        this.message = m;
    }
}