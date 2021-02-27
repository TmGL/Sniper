import { Command } from '../../../interfaces';

export const command: Command = {
    name: 'ping',
    description: 'Ping time for the bot.',
    aliases: ['ms'],
    usage: 'ping',
    run: async(client, message) => {
        return message.channel.send('Pinging...').then(msg => {
            msg.edit(`Bot Ping: ${msg.createdTimestamp - message.createdTimestamp + 'ms'} \nAPI Ping: ${client.ws.ping + 'ms'}`);
        });
    }
}