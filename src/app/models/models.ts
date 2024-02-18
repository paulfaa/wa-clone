import { MessageType } from "./message-type";

export interface Chat {
    chats: ChatDetails[];
}

export interface ChatDetails {
    key: string;
    contactName: string;
    messages: WhatsappMessage[];
}

export interface WhatsappMessage {
    messageId: number;
    timestamp: Date;
    fromMe: boolean;
    type: MessageType;
    text?: string;
    duration?: number;
    filename?: string;
    caption?: string;
    link?: string;
    location?: string;
    isFavourite?: boolean;
}

//todo
//date needs to take daylight saving into account