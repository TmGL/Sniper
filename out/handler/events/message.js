"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const bot_json_1 = require("../../config/bot.json");
exports.event = {
    name: 'message',
    run: (client, message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix))
            return;
        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
        const commandName = args
            .shift()
            .toLowerCase();
        const command = client.commands.get(commandName) || client.aliases.get(commandName);
        if (command) {
            if (command.devOnly && message.author.id !== bot_json_1.ownerId)
                return;
            command.run(client, message, args);
        }
    }
};
//# sourceMappingURL=message.js.map