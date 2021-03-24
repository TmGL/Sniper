import { Command } from '../../../interfaces';
import { messages } from '../../../util';
import { User } from 'discord.js';

export const command: Command = {
    name: 'unban',
    description: 'Unbans a user from the guild.',
    aliases: ['ub'],
    usage: 'unban <user> [reason]',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.reply(messages.commands.mod.errors.no_perms('unban members'));
        }

        if (!args.length) {
            return message.reply(messages.commands.mod.errors.invalid_user);
        }

        const reason: string = args.slice(1).join(' ') || 'No reason provided';

        const id = Number(args[0]);

        if (isNaN(id)) {
            return message.reply(messages.commands.mod.errors.invalid_id);
        }

        return client.users.fetch(args[0]).then((user: User) => {
            message.guild.members.unban(user, reason).then(() => {
                message.channel.send(messages.commands.mod.success.unban(user));
            }).catch(() => {
                message.reply(messages.commands.mod.errors.already.unbanned);
            });
        }).catch(() => {
            return message.reply(messages.commands.mod.errors.invalid_user);
        });
    }
}