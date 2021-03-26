"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const util_1 = require("../../../util");
const configSchema_1 = require("../../../schemas/configSchema");
exports.command = {
    name: 'unmute',
    description: 'Unmutes a member in the server.',
    aliases: ['um'],
    usage: 'umute <user> [reason]',
    run: async (client, message, args) => {
        let modRoleId;
        let mutedRoleId;
        await configSchema_1.configSchema.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (err) {
                throw err;
            }
            if (data) {
                modRoleId = data.ModRoleId;
                mutedRoleId = data.MutedRoleId;
            }
        });
        if (!message.member.permissions.has('MANAGE_ROLES') && !message.member.roles.cache.has(modRoleId))
            return;
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.reply(util_1.messages.commands.mod.errors.no_perms('unmute members'));
        }
        if (!args.length) {
            return message.reply(util_1.messages.commands.mod.errors.args.general('to unmute'));
        }
        const role = message.guild.roles.cache.get(mutedRoleId) || message.guild.roles.cache.find(r => r.name === 'Muted');
        const member = util_1.parseMember(message.guild, args[0]);
        if (!member) {
            return message.reply(util_1.messages.commands.mod.errors.invalid_member);
        }
        if (!role) {
            return message.reply(util_1.messages.commands.mod.errors.already.muted);
        }
        if (!role.editable) {
            return message.reply(util_1.messages.commands.mod.errors.muted_role_not_editable);
        }
        if (!member.roles.cache.has(role.id)) {
            return message.reply(util_1.messages.commands.mod.errors.already.unmuted);
        }
        try {
            await member.roles.remove(role);
            await message.channel.send(util_1.messages.commands.mod.success.send(member, 'unmuted'));
        }
        catch (err) {
            console.error(err);
        }
    }
};
//# sourceMappingURL=unmute.js.map