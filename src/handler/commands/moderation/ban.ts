import { Command, ServerConfig, MemberHistory } from '../../../interfaces';
import { parseMember } from '../../../util';
import { memberHistorySchema as Schema } from '../../../schemas/memberHistorySchema';
import { configSchema as Config } from '../../../schemas/configSchema';

export const command: Command = {
    name: 'ban',
    description: 'Bans a member in the server.',
    aliases: ['b'],
    usage: 'ban <user> [reason]',
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

        if (!message.member.permissions.has('BAN_MEMBERS') && !message.member.roles.cache.has(modRoleId)) return;

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
            await member.ban({ reason: reason, days: 0 });
            await message.channel.send(`**${member.user.tag}** was banned successfully!`);
            await Schema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err: Error, data: MemberHistory) => {
                if (err) {
                    throw err;
                }

                if (data) {
                    if (data.Bans) {
                        (data.Bans as number)++;
                    } else {
                        data.Bans = 1;
                    }
                    if (data.RecentActions) {
                        data.RecentActions.push(`\`Banned\` by \`${message.author.tag}\` on \`${new Date(new Date().getTime()).toLocaleDateString()}\` for \`${reason}\``);
                    } else {
                        data.RecentActions = [`\`Banned\` by \`${message.author.tag}\` on \`${new Date(new Date().getTime()).toLocaleDateString()}\` for \`${reason}\``];
                    }
                    data.save();
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Bans: 1,
                        RecentActions: [`\`Banned\` by \`${message.author.tag}\` on \`${new Date(new Date().getTime()).toLocaleDateString()}\` for \`${reason}\``]
                    }).save();
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}