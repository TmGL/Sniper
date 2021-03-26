"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const util_1 = require("../../../util");
exports.command = {
    name: 'help',
    usage: 'help [command]',
    run: async (client, message, args) => {
        const help = new discord_js_1.MessageEmbed()
            .setTitle('All Commands')
            .setColor('RANDOM')
            .setFooter(`Type ${client.config.prefix}help <command name> for info on that command!`)
            .addField('Moderation', '`ban`, `history`, `kick`, `mute`, `softban`, `unmute`, `unban`')
            .addField('Config', '`modrole`, `muterole`')
            .addField('Misc', '`help`, `ping`, `invite`')
            .addField('Dev', '`eval`, `docs`');
        if (args.length) {
            const commandName = args[0]?.toLowerCase();
            const command = client.commands.get(commandName) || client.aliases.get(commandName);
            if (command) {
                const description = command.description || 'No description';
                const aliases = command.aliases ? command.aliases.join(', ') : 'No aliases';
                const usage = client.config.prefix + command.usage;
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle(`${util_1.capitalise(command.name)} Help`)
                    .setColor('RANDOM')
                    .setFooter(`Type ${client.config.prefix}help <command name> for info on that command!`)
                    .addField('Description', description)
                    .addField('Usage', usage)
                    .addField('Aliases', aliases));
            }
            else {
                return message.channel.send(help);
            }
        }
        return message.channel.send(help);
    }
};
//# sourceMappingURL=help.js.map