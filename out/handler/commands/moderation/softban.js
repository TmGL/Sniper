"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const util_1 = require("../../../util");
const memberHistorySchema_1 = require("../../../schemas/memberHistorySchema");
const configSchema_1 = require("../../../schemas/configSchema");
exports.command = {
    name: 'softban',
    description: 'Softbans a member in the server.',
    aliases: ['sb'],
    usage: 'softban <user> [reason]',
    run: async (client, message, args) => {
        let modRoleId;
        await configSchema_1.configSchema.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (err) {
                throw err;
            }
            if (data) {
                modRoleId = data.ModRoleId;
            }
        });
        if (!message.member.permissions.has('BAN_MEMBERS') && !message.member.roles.cache.has(modRoleId))
            return;
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.reply(util_1.messages.commands.mod.errors.no_perms('ban members'));
        }
        if (!args.length) {
            return message.reply(util_1.messages.commands.mod.errors.args.general('to softban'));
        }
        const member = util_1.parseMember(message.guild, args[0]);
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!member) {
            return message.reply(util_1.messages.commands.mod.errors.invalid_member);
        }
        if (!member.bannable) {
            return message.reply(util_1.messages.commands.mod.errors.not_bannable);
        }
        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0 && message.member.id !== message.guild.ownerID) {
            return message.reply(util_1.messages.commands.mod.errors.role_hierarchy);
        }
        try {
            await member.ban({ reason: reason, days: 7 });
            await message.channel.send(util_1.messages.commands.mod.success.send(member, 'softbanned'));
            await message.guild.members.unban(member.user.id, `Softbanned by ${message.author.tag}`);
            await memberHistorySchema_1.memberHistorySchema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err, data) => {
                if (err) {
                    throw err;
                }
                const recent = util_1.messages.commands.mod.success.db.recent('Softbanned', message.author.tag, new Date().getTime(), reason);
                if (data) {
                    data.Softbans ? data.Softbans++ : data.Softbans = 1;
                    data.RecentActions ? data.RecentActions.push() : data.RecentActions = [recent];
                    data.save();
                }
                else {
                    new memberHistorySchema_1.memberHistorySchema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Softbans: 1,
                        RecentActions: [recent]
                    }).save();
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    }
};
//# sourceMappingURL=softban.js.map