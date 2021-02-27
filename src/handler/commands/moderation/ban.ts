import { Command } from '../../../interfaces';
import { parseMember } from '../../../util';

export const command: Command = {
    name: 'ban',
    description: 'Bans a member in the server.',
    aliases: ['b'],
    usage: 'ban <user> [reason]',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.channel.send(
                'I do not have permission to ban members!'
            );
        }

        if (!args.length) {
            return message.channel.send(
                'Please provide a valid member!'
            );
        }

        const member = parseMember(message.guild, args[0]);

        if (!member) {
            return message.channel.send(
                'I could not find the member specified!'
            );
        }

        if (!member.bannable) {
            return message.channel.send(
                'I cannot ban that member!'
            );
        }

        try {
            await member.ban({ reason: args.slice(1).join(' '), days: 1 });
            await message.channel.send(member.user.tag + ' was banned successfully!');
        } catch (err) {
            console.error(err);
        }
    }
}