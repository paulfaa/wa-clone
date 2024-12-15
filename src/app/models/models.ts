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
    id: string;
    timestamp: Date;
    fromMe: boolean;
    type: MessageType;
    text?: string;
    duration?: number;
    filename?: string;
    caption?: string;
    link?: string;
    location?: string;
    quotedMessageId?: string;
    isFavourite?: boolean;
}

interface BaseMessage {
    id: string;
    timestamp: Date;
    fromMe: boolean;
    type: MessageType;
    quotedMessageId?: string;
    isFavourite: boolean;
}

interface TextMessage extends BaseMessage {
    text: string;
}

interface LinkMessage extends BaseMessage {
    link: string;
    caption?: string;
}

interface LocationMessage extends BaseMessage {
    location: string;
}

interface ImageMessage extends BaseMessage {
    filename: string;
    caption?: string;
}

interface AudioMessage extends BaseMessage {
    filename: string;
    duration: number;
}

//todo
//date needs to take daylight saving into account