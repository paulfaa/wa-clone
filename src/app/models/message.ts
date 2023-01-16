export class Message {
    timestamp: Date;
    fromMe: boolean;
    type?: string;
    text: string;

    constructor(timestamp: Date, fromMe: boolean, text: string) {
        this.timestamp = timestamp;
        this.fromMe = fromMe;
        this.text = text;
    }
}
