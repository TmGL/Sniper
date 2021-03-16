import { Command } from "../../../interfaces";
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';
import { parseMember } from '../../../util';
import { MessageEmbed } from 'discord.js';
import { MemberHistory } from '../../../interfaces';
import { getLast } from '../../../util';

export const command: Command = {
    name: 'history',
    description: 'Warns a member in the server',
    usage: 'warn <user> <reason>',
    aliases: ['w'],
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

        if (!args.length) {
            return message.reply('Please provide a valid member!');
        }

        const member = parseMember(message.guild, args[0]);

        if (!member) {
            return message.reply('I couldn\'t find the member specified!');
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
                    return message.reply('That member has no moderation history!');
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