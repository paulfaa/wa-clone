export class Message {
    id?: number;
    timestamp: Date;
    fromMe: boolean;
    $type?: string;
    text: string;
    $isFavourite?: boolean = false;

    constructor(timestamp: Date, fromMe: boolean, text: string, id?:number) {
        this.timestamp = timestamp;
        this.fromMe = fromMe;
        this.text = text;
        this.id = id;
    }
}
