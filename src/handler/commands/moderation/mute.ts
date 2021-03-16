import ms from 'ms';
import { Command } from '../../../interfaces';
import { parseMember } from '../../../util';
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';
import { MemberHistory } from '../../../interfaces';
import { configSchema as Config } from '../../../schemas/configSchema';
import { ServerConfig } from '../../../interfaces';

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

        if (!message.member.permissions.has('BAN_MEMBERS') && !message.member.roles.cache.has(modRoleId)) return;

        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.reply('I do not have permission to mute members!');
        }

        if (!args.length) {
            return message.reply('Please provide a valid member!');
        }

        let role = message.guild.roles.cache.get(mutedRoleId) || message.guild.roles.cache.find(r => r.name === 'Muted');
        let reason = args.slice(1).join(' ') || 'No reason provided';
        const member = parseMember(message.guild, args[0]);

        if (!member) {
            return message.reply('I could not find the member specified!');
        }

        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0 && message.member.id !== message.guild.ownerID) {
            return message.reply('That member has a higher role than you!');
        }
        
        if (!role) {
            return message.reply('The muted role has not been setup for this server or a role called Muted, use the muterole command to set it up!');
        }

        if (!role.editable) {
            return message.reply('I cannot manage the muted role!');
        }

        if (member.roles.cache.has(role.id)) {
            return message.reply('That member is already muted!');
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
            await message.channel.send(`**${member.user.tag}** was muted successfully!`);
            await Schema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err: Error, data: MemberHistory) => {
                if (err) {
                    throw err;
                }

                if (data) {
                    if (data.Mutes) {
                        (data.Mutes as number)++;
                    } else {
                        data.Mutes = 1;
                    }
                    if (data.RecentActions) {
                        data.RecentActions.push(`\`Muted\` by \`${message.author.tag}\` on \`${new Date(new Date().getTime()).toLocaleDateString()}\` for \`${reason}\``);
                    } else {
                        data.RecentActions = [`\`Muted\` by \`${message.author.tag}\` on \`${new Date(new Date().getTime()).toLocaleDateString()}\` for \`${reason}\``];
                    }
                    data.save();
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Mutes: 1,
                        RecentActions: [`\`Muted\` by \`${message.author.tag}\` on \`${new Date(new Date().getTime()).toLocaleDateString()}\` for \`${reason}\``]
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