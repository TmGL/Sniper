import { Command } from '../../../interfaces';
import { parseMember } from '../../../util';

export const command: Command = {
    name: 'kick',
    description: 'Kicks a member in the server.',
    aliases: ['k'],
    usage: 'kick <user> [reason]',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('KICK_MEMBERS')) return;

        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.channel.send(
                'I do not have permission to kick members!'
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

        if (!member.kickable) {
            return message.channel.send(
                'I cannot ban that member!'
            );
        }

        try {
            await member.kick(args.slice(1).join(' '));
            await message.channel.send(member.user.tag + ' was kicked successfully!');
        } catch (err) {
            console.error(err);
        }
    }
}