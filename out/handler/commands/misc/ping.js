"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: 'ping',
    description: 'Ping time for the bot.',
    aliases: ['ms'],
    usage: 'ping',
    run: async (client, message) => {
        return message.channel.send('Pinging...').then(msg => {
            msg.edit(`Bot Ping: ${msg.createdTimestamp - message.createdTimestamp + 'ms'} \nAPI Ping: ${client.ws.ping + 'ms'}`);
        });
    }
};
//# sourceMappingURL=ping.js.map