"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const configSchema_1 = require("../../../schemas/configSchema");
const util_1 = require("../../../util");
exports.command = {
    name: 'modrole',
    description: 'Set\'s the mod role for the server. The people with this role can use moderation commands.',
    usage: 'modrole <set/remove> <role>',
    run: async (client, message, args) => {
        if (!message.member.permissions.has(['MANAGE_GUILD', 'MANAGE_ROLES']))
            return;
        if (!args.length) {
            return message.reply(util_1.messages.commands.config.errors.args.general(['set', 'remove']));
        }
        await configSchema_1.configSchema.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (err) {
                throw err;
            }
            if (args[0]?.toLowerCase() === "set") {
                if (!args[1]) {
                    return message.reply(util_1.messages.commands.config.errors.args.set);
                }
                const role = util_1.parseRole(message.guild, args[1]);
                if (!role) {
                    return message.reply('I couldn\'t find the role specified!');
                }
                if (data) {
                    data.ModRoleId = role.id;
                    data.save();
                    return message.channel.send(`The mod role has been set to **${role.name}**`);
                }
                else {
                    new configSchema_1.configSchema({
                        Guild: message.guild.id,
                        ModRoleId: role.id
                    }).save();
                    return message.channel.send(`The mod role has been set to **${role.name}**`);
                }
            }
            else if (args[0]?.toLowerCase() === "remove") {
                if (data) {
                    data.delete();
                    return message.channel.send(`The mod role has been removed successfully!`);
                }
                else {
                    return message.channel.send('The mod role is not setup for this server!');
                }
            }
        });
    }
};
//# sourceMappingURL=modrole.js.map