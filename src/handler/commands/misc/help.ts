import { Command } from '../../../interfaces';
import { MessageEmbed } from 'discord.js';
import { capitalise } from "../../../util";

export const command: Command = {
    name: 'help',
    usage: 'help [command]',
    run: async (client, message, args) => {
        const help = new MessageEmbed()
            .setTitle('All Commands')
            .setColor('RANDOM')
            .setFooter(`Type ${client.config.prefix}help <command name> for info on that command!`)
            .addField('Moderation', '`ban`, `kick`, `mute`, `unmute`')
            .addField('Misc', '`help`, `ping`, `invite`')
            .addField('Dev', '`eval`');

        if (args.length) {
            const commandName = args[0]?.toLowerCase();
            const command = client.commands.get(commandName) || client.aliases.get(commandName);

            if (command) {
                const description = command.description || 'No description';
                const aliases = command.aliases ? command.aliases.join(', ') : 'No aliases';
                const usage = client.config.prefix + command.usage;

                return message.channel.send(
                    new MessageEmbed()
                        .setTitle(`${capitalise(command.name)} Help`)
                        .setColor('RANDOM')
                        .setFooter(`Type ${client.config.prefix}help <command name> for info on that command!`)
                        .addField('Description', description)
                        .addField('Usage', usage)
                        .addField('Aliases', aliases)
                );
            } else {
                return message.channel.send(help)
            }
        }

        return message.channel.send(help);
    }
}