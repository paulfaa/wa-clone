export interface jsonMessage {
    timestamp: Date;
    fromMe: boolean;
    type: string;
    text: string;
}