import { Command, ServerConfig, MemberHistory } from '../../../interfaces';
import { parseMember, messages } from '../../../util';
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';
import { configSchema as Config } from '../../../schemas/configSchema';
import { GuildMember } from 'discord.js';

export const command: Command = {
    name: 'kick',
    description: 'Kicks a member in the server.',
    aliases: ['k'],
    usage: 'kick <user> [reason]',
    run: async (client, message, args) => {
        let modRoleId: string;
        await Config.findOne({
            Guild: message.guild.id
        }, async (err: Error, data: ServerConfig) => {
            if (err) {
                throw err;
            }

            if (data) {
                modRoleId = data.ModRoleId;
            }
        });

        if (!message.member.permissions.has('KICK_MEMBERS') && !message.member.roles.cache.has(modRoleId)) return;

        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.reply(messages.commands.mod.errors.no_perms('kick members'));
        }

        if (!args.length) {
            return message.reply(messages.commands.mod.errors.args.general('kick'));
        }

        const member: GuildMember = parseMember(message.guild, args[0]);
        const reason: string = args.slice(1).join(' ') || 'No reason provided';

        if (!member) {
            return message.reply(messages.commands.mod.errors.invalid_member);
        }

        if (!member.kickable) {
            return message.reply(messages.commands.mod.errors.not_kickable);
        }

        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0 && message.member.id !== message.guild.ownerID) {
            return message.reply(messages.commands.mod.errors.role_hierarchy);
        }
        
        try {
            await member.kick(args.slice(1).join(' '));
            await message.channel.send(messages.commands.mod.success.send(member, 'kicked'));
            await Schema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err: Error, data: MemberHistory) => {
                if (err) {
                    throw err;
                }

                const recent = messages.commands.mod.success.db.recent('Banned', message.author.tag, new Date().getTime(), reason);

                if (data) {
                    data.Kicks ? (data.Kicks as number)++ : data.Kicks = 1;
                    data.RecentActions ? data.RecentActions.push(recent) : data.RecentActions = [recent];
                    data.save();
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Kicks: 1,
                        RecentActions: [recent]
                    }).save();
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}