import { Command } from '../../../interfaces';
import { parseMember } from '../../../util';
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';
import { MemberHistory } from '../../../interfaces';

export const command: Command = {
    name: 'softban',
    description: 'Softbans a member in the server.',
    aliases: ['sb'],
    usage: 'softban <user> [reason]',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.reply('I do not have permission to ban members!');
        }

        if (!args.length) {
            return message.reply('Please provide a valid member!');
        }

        const member = parseMember(message.guild, args[0]);
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!member) {
            return message.reply('I could not find the member specified!');
        }

        if (!member.bannable) {
            return message.reply('I cannot ban that member!');
        }

        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0 && message.member.id !== message.guild.ownerID) {
            return message.reply('That member has a higher role than you!');
        }

        try {
            await member.ban({ reason: reason, days: 7 });
            await message.channel.send(member.user.tag + ' was softbanned successfully!');
            await message.guild.members.unban(member.user.id, `Softbanned by ${message.author.tag}`);
            await Schema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err: Error, data: MemberHistory) => {
                if (err) {
                    throw err;
                }

                if (data) {
                    if (data.Softbans) {
                        (data.Softbans as number)++;
                    } else {
                        data.Softbans = 1;
                    }
                    data.LastAction = {
                        author: message.author.id,
                        action: 'Softbanned',
                        date: new Date().getTime(),
                        reason: reason
                    }
                    data.save();
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Softbans: 1,
                        LastAction: {
                            author: message.author.id,
                            action: 'Softbanned',
                            date: new Date().getTime(),
                            reason: reason
                        }
                    }).save();
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}