import { MessageType } from '../models/message-type'
import { WhatsappMessage } from '../models/models'

export const sampleMessage1: WhatsappMessage = {
    id: 'e0f89ae3-e5ee-4611-b65b-00a8abfec642',
    timestamp: '2019-10-05T00:00:00Z',
    fromMe: true,
    type: MessageType.text,
    text: 'Message contents...',
}

export const sampleMessage2: WhatsappMessage = {
    id: '2e419da2-a369-4915-8a78-3e76eecb714e',
    timestamp: '2020-03-12T00:00:00Z',
    fromMe: true,
    type: MessageType.text,
    text: 'Lorum Ipsum',
}

export const sampleMessage3: WhatsappMessage = {
    id: '89ea0505-c2b5-4511-bb49-27d25f667269',
    timestamp: '2020-10-13T00:00:00Z',
    fromMe: true,
    type: MessageType.text,
    text: 'Hello world...',
}

export const sampleMessage4: WhatsappMessage = {
    id: '51504725-b516-48ac-9bc7-7374c1619bfd',
    timestamp: '2020-05-14T00:00:00Z',
    fromMe: true,
    type: MessageType.text,
    text: 'Message contents 2....',
}

export const sampleMessage5: WhatsappMessage = {
    id: '51504725-b516-48ac-9bc7-7374c1619bfd',
    timestamp: '2020-05-14T09:20:00Z',
    fromMe: true,
    type: MessageType.text,
    text: 'Same day message',
}
