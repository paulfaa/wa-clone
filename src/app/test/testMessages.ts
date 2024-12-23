import { MessageType } from "../models/message-type";
import { WhatsappMessage } from "../models/models";

export const sampleMessage1: WhatsappMessage = {
    id:"e0f89ae3-e5ee-4611-b65b-00a8abfec642",
    timestamp: new Date(2019, 10, 5),
    fromMe: true,
    type: MessageType.text,
    text: "Message contents...."
}

export const sampleMessage2: WhatsappMessage = {
    id:"2e419da2-a369-4915-8a78-3e76eecb714e",
    timestamp: new Date(2020, 3, 12),
    fromMe: true,
    type: MessageType.text,
    text: "Lorum Ipsum"
}

export const sampleMessage3: WhatsappMessage = {
    id:"89ea0505-c2b5-4511-bb49-27d25f667269",
    timestamp: new Date(2020, 10, 13),
    fromMe: true,
    type: MessageType.text,
    text: "Hello world..."
}

export const sampleMessage4: WhatsappMessage = {
    id:"51504725-b516-48ac-9bc7-7374c1619bfd",
    timestamp: new Date(2020, 5, 14),
    fromMe: true,
    type: MessageType.text,
    text: "Message contents 2...."
}