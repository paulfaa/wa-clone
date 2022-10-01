export class Message {
    messageDate: Date;
    author: string;
    messageContents: string;
    isChatOwner: boolean;

    constructor(date: Date, author: string, contents: string, isChatOwner: boolean) {
        this.messageDate = date;
        this.author = author;
        this.messageContents = contents;
        this.isChatOwner = isChatOwner;
    }
}
