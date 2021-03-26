import { Command } from '../../../interfaces';
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';
import { parseMember, getLast, messages } from '../../../util';
import { MessageEmbed, GuildMember } from 'discord.js';
import { MemberHistory } from '../../../interfaces';

export const command: Command = {
    name: 'history',
    description: 'Warns a member in the server',
    usage: 'warn <user> <reason>',
    aliases: ['w'],
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

        if (!args.length) {
            return message.reply(messages.commands.mod.errors.args.general());
        }

        const member: GuildMember = parseMember(message.guild, args[0]);

        if (!member) {
            return message.reply(messages.commands.mod.errors.invalid_member);
        }

        try {
            await Schema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err: Error, data: MemberHistory) => {
                if (err) {
                    throw err;
                }

                if (!data) {
                    return message.reply(messages.commands.mod.errors.no_history);
                }

                const { Bans, Kicks, Mutes, Warns, Softbans, RecentActions } = data;
                
                const history = new MessageEmbed()
                    .setTitle('History for ' + member.user.tag)
                    .addField('Recent Mod Actions', getLast(RecentActions, 3).join('\n') || 'None')
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setColor('RANDOM')
                    .setDescription(`Bans: \`${Bans || 0}\` \nKicks: \`${Kicks || 0}\` \nMutes: \`${Mutes || 0}\` \nWarns: \`${Warns || 0}\` \nSoftbans: \`${Softbans || 0}\``);

                return message.channel.send(history);
            });
        } catch (err) {
            console.error(err);
        }
    }
}