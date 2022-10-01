export class Message {
    messageDate: Date;
    messageContents: string;
    isChatOwner: boolean;

    constructor(date: Date, contents: string, isChatOwner: boolean) {
        this.messageDate = date;
        this.messageContents = contents;
        this.isChatOwner = isChatOwner;
    }
}
