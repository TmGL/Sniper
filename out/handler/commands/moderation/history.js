"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const memberHistorySchema_1 = require("../../../schemas/memberHistorySchema");
const util_1 = require("../../../util");
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'history',
    description: 'Warns a member in the server',
    usage: 'warn <user> <reason>',
    aliases: ['w'],
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES'))
            return;
        if (!args.length) {
            return message.reply(util_1.messages.commands.mod.errors.args.general());
        }
        const member = util_1.parseMember(message.guild, args[0]);
        if (!member) {
            return message.reply(util_1.messages.commands.mod.errors.invalid_member);
        }
        try {
            await memberHistorySchema_1.memberHistorySchema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err, data) => {
                if (err) {
                    throw err;
                }
                if (!data) {
                    return message.reply(util_1.messages.commands.mod.errors.no_history);
                }
                const { Bans, Kicks, Mutes, Warns, Softbans, RecentActions } = data;
                const history = new discord_js_1.MessageEmbed()
                    .setTitle('History for ' + member.user.tag)
                    .addField('Recent Mod Actions', util_1.getLast(RecentActions, 3).join('\n') || 'None')
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setColor('RANDOM')
                    .setDescription(`Bans: \`${Bans || 0}\` \nKicks: \`${Kicks || 0}\` \nMutes: \`${Mutes || 0}\` \nWarns: \`${Warns || 0}\` \nSoftbans: \`${Softbans || 0}\``);
                return message.channel.send(history);
            });
        }
        catch (err) {
            console.error(err);
        }
    }
};
//# sourceMappingURL=history.js.map