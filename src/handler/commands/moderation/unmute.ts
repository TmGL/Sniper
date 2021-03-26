import { Command, ServerConfig } from '../../../interfaces';
import { parseMember, messages } from '../../../util';
import { configSchema as Config } from '../../../schemas/configSchema';

export const command: Command = {
    name: 'unmute',
    description: 'Unmutes a member in the server.',
    aliases: ['um'],
    usage: 'umute <user> [reason]',
    run: async (client, message, args) => {
        let modRoleId: string;
        let mutedRoleId: string;
        await Config.findOne({
            Guild: message.guild.id
        }, async (err: Error, data: ServerConfig) => {
            if (err) {
                throw err;
            }

            if (data) {
                modRoleId = data.ModRoleId;
                mutedRoleId = data.MutedRoleId;
            }
        });

        if (!message.member.permissions.has('MANAGE_ROLES') && !message.member.roles.cache.has(modRoleId)) return;

        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.reply(messages.commands.mod.errors.no_perms('unmute members'));
        }

        if (!args.length) {
            return message.reply(messages.commands.mod.errors.args.general('to unmute'));
        }

        const role = message.guild.roles.cache.get(mutedRoleId) || message.guild.roles.cache.find(r => r.name === 'Muted');
        const member = parseMember(message.guild, args[0]);

        if (!member) {
            return message.reply(messages.commands.mod.errors.invalid_member);
        }

        if (!role) {
            return message.reply(messages.commands.mod.errors.already.muted);
        }

        if (!role.editable) {
            return message.reply(messages.commands.mod.errors.muted_role_not_editable);
        }

        if (!member.roles.cache.has(role.id)) {
            return message.reply(messages.commands.mod.errors.already.unmuted);
        }

        try {
            await member.roles.remove(role);
            await message.channel.send(messages.commands.mod.success.send(member, 'unmuted'));
        } catch (err) {
            console.error(err);
        }
    }
}