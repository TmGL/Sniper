"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const util_1 = require("../../../util");
const memberHistorySchema_1 = require("../../../schemas/memberHistorySchema");
const configSchema_1 = require("../../../schemas/configSchema");
exports.command = {
    name: 'kick',
    description: 'Kicks a member in the server.',
    aliases: ['k'],
    usage: 'kick <user> [reason]',
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
        if (!message.member.permissions.has('KICK_MEMBERS') && !message.member.roles.cache.has(modRoleId))
            return;
        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.reply(util_1.messages.commands.mod.errors.no_perms('kick members'));
        }
        if (!args.length) {
            return message.reply(util_1.messages.commands.mod.errors.args.general('kick'));
        }
        const member = util_1.parseMember(message.guild, args[0]);
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!member) {
            return message.reply(util_1.messages.commands.mod.errors.invalid_member);
        }
        if (!member.kickable) {
            return message.reply(util_1.messages.commands.mod.errors.not_kickable);
        }
        if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0 && message.member.id !== message.guild.ownerID) {
            return message.reply(util_1.messages.commands.mod.errors.role_hierarchy);
        }
        try {
            await member.kick(args.slice(1).join(' '));
            await message.channel.send(util_1.messages.commands.mod.success.send(member, 'kicked'));
            await memberHistorySchema_1.memberHistorySchema.findOne({
                Guild: message.guild.id,
                Member: member.user.id
            }, async (err, data) => {
                if (err) {
                    throw err;
                }
                const recent = util_1.messages.commands.mod.success.db.recent('Banned', message.author.tag, new Date().getTime(), reason);
                if (data) {
                    data.Kicks ? data.Kicks++ : data.Kicks = 1;
                    data.RecentActions ? data.RecentActions.push(recent) : data.RecentActions = [recent];
                    data.save();
                }
                else {
                    new memberHistorySchema_1.memberHistorySchema({
                        Guild: message.guild.id,
                        Member: member.user.id,
                        Kicks: 1,
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
//# sourceMappingURL=kick.js.map