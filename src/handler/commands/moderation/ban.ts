import { Command } from '../../../interfaces';
import { parseMember } from '../../../util';
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';

export const command: Command = {
    name: 'ban',
    description: 'Bans a member in the server.',
    aliases: ['b'],
    usage: 'ban <user> [reason]',
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

        try {
            await member.ban({ reason: reason, days: 1 });
            await message.channel.send(member.user.tag + ' was banned successfully!');
            await Schema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err: Error, data: any) => {
                if (err) {
                    throw err;
                }

                if (data) {
                    if (data.Bans) {
                        (data.Bans as number)++;
                    } else {
                        data.Bans = 1;
                    }
                    (data.LastAction as object) = {
                        author: message.author.id,
                        action: 'Banned',
                        date: new Date().getTime(),
                        reason: reason
                    }
                    data.save();
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Bans: 1,
                        LastAction: {
                            author: message.author.id,
                            action: 'Banned',
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