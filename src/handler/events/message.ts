import { Event, Command } from '../../interfaces';
import { Message } from 'discord.js';

export const event: Event = {
    name: 'message',
    run: (client, message: Message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)) return;

        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
        const commandName = args
            .shift()
            .toLowerCase();

        const command = client.commands.get(commandName) || client.aliases.get(commandName);
        if (command) (command as Command).run(client, message, args);
    }
}