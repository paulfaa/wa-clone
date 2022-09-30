export class Message {
    messageDate: Date;
    messageContents: string;
    sentByMe: boolean;

    constructor(date: Date, contents: string, sentByMe: boolean) {
        this.messageDate = date;
        this.messageContents = contents;
        this.sentByMe = sentByMe;
    }
}
