import { Command } from '../../../interfaces';
import { parseMember } from '../../../util';

export const command: Command = {
    name: 'unmute',
    description: 'Unmutes a member in the server.',
    aliases: ['um'],
    usage: 'umute <user> [reason]',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_ROLES')) return;

        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.channel.send(
                'I do not have permission to unmute members!'
            );
        }

        if (!args.length) {
            return message.channel.send(
                'Please provide a valid member!'
            );
        }

        let role = message.guild.roles.cache.find(r => r.name === 'Muted');
        const member = parseMember(message.guild, args[0]);

        if (!member) {
            return message.channel.send(
                'I could not find the member specified!'
            );
        }

        if (!role) {
            return message.channel.send(
                'That user is not muted!'
            );
        }

        if (!role.editable) {
            return message.channel.send(
                'I cannot manage the muted role!'
            );
        }

        if (!member.roles.cache.has(role.id)) {
            return message.channel.send(
                'That member is not muted!'
            );
        }

        try {
            await member.roles.remove(role);
            await message.channel.send(member.user.tag + ' was umuted successfully!');
        } catch (err) {
            console.error(err);
        }
    }
}