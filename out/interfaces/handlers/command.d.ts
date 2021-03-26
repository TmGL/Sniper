import Client from '../../client';
import { Message } from 'discord.js';
interface Run {
    (client: Client, message: Message, args: string[]): any;
}
export interface Command {
    name: string;
    description?: string;
    usage: string;
    devOnly?: boolean;
    aliases?: string[];
    run: Run;
}
export {};
