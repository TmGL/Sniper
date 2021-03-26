"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: 'invite',
    description: 'Sends the invite link for the bot',
    usage: 'invite',
    run: (client, message) => {
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setTitle('Invite Link')
            .setDescription(`Click [here](${client.config.invite}) to invite the bot!`)
            .setColor('RANDOM')
            .setFooter('Enjoy the bot!'));
    }
};
//# sourceMappingURL=invite.js.map