import { MessageType } from './message-type'

export interface Chat {
    chats: ChatDetails[]
}

export interface ChatDetails {
    key: string
    contactName: string
    messages: WhatsappMessage[]
}

export interface YearMonth {
    year: number
    month: number
}

export interface WhatsappMessage {
    timestamp: string
    id: string
    fromMe: boolean
    type: MessageType
    text?: string
    duration?: number
    filename?: string
    caption?: string
    link?: string
    location?: string
    quotedMessageId?: string
    quotedTimestamp?: string
    isFavourite?: boolean
    quote?: WhatsappMessage
}

export interface BaseMessage {
    timestamp: string
    id: string
    fromMe: boolean
    type: MessageType
    quotedMessageId?: string
    quotedTimestamp?: string
    isFavourite: boolean
    quote?: Quote
}

export interface TextMessage extends BaseMessage {
    text: string
}

export interface LinkMessage extends BaseMessage {
    link: string
    caption?: string
}

export interface LocationMessage extends BaseMessage {
    location: string
}

export interface ImageMessage extends BaseMessage {
    filename: string
    caption?: string
}

export interface AudioMessage extends BaseMessage {
    filename: string
    duration: number
}

export interface Quote extends BaseMessage {
    content: any
    quotedMessageId?: string
}
