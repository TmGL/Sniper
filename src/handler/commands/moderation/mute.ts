import { Command, ServerConfig, MemberHistory } from '../../../interfaces';
import { parseMember, ms, messages } from '../../../util';
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';
import { configSchema as Config } from '../../../schemas/configSchema';
import { Role, GuildMember } from 'discord.js';

export const command: Command = {
    name: 'mute',
    description: 'Mutes a member in the server.',
    aliases: ['m'],
    usage: 'mute <user> [time] [reason]',
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
            return message.reply(messages.commands.mod.errors.no_perms('manage roles'));
        }

        if (!args.length) {
            return message.reply(messages.commands.mod.errors.args.general('to mute'));
        }

        const role: Role = message.guild.roles.cache.get(mutedRoleId) || message.guild.roles.cache.find(r => r.name === 'Muted');
        let reason: string = args.slice(1).join(' ') || 'No reason provided';
        const member: GuildMember = parseMember(message.guild, args[0]);

        if (!member) {
            return message.reply(messages.commands.mod.errors.invalid_member);
        }

        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0 && message.member.id !== message.guild.ownerID) {
            return message.reply(messages.commands.mod.errors.role_hierarchy);
        }
        
        if (!role) {
            return message.reply(messages.commands.mod.errors.no_muted_role);
        }

        if (!role.editable) {
            return message.reply('I cannot manage the muted role!');
        }

        if (member.roles.cache.has(role.id)) {
            return message.reply(messages.commands.mod.errors.already.muted);
        }

        let parsedDuration: number;
        if (args[1]) {
            if (!isNaN(Number(args[1]))) {
                parsedDuration = ms(args[1] + ' minutes');
            } else {
                parsedDuration = ms(args[1]);
            }
        }

        if (parsedDuration) reason = args.slice(2).join(' ');

        try {
            await member.roles.add(role, parsedDuration ? args.slice(2).join(' ') : args.slice(1).join(' '));
            await message.channel.send(messages.commands.mod.success.send(member, 'muted'));
            await Schema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err: Error, data: MemberHistory) => {
                if (err) {
                    throw err;
                }

                const recent = messages.commands.mod.success.db.recent('Muted', message.author.tag, new Date().getTime(), reason);

                if (data) {
                    data.Mutes ? (data.Mutes as number)++ : data.Mutes = 1;
                    data.RecentActions ? data.RecentActions.push(recent) : data.RecentActions = [recent];
                    data.save();
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Mutes: 1,
                        RecentActions: [recent]
                    }).save();
                }
            });

            if (parsedDuration) {
                setTimeout(() => {
                    member.roles.remove(role);
                }, parsedDuration);
            }
        } catch (err) {
            console.error(err);
        }
    }
}