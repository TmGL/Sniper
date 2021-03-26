"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const util_1 = require("util");
exports.command = {
    name: 'eval',
    description: 'Evaluates code.',
    aliases: ['ev'],
    usage: 'eval <code>',
    devOnly: true,
    run: async (client, message, args) => {
        const code = args.join(' ');
        if (!code) {
            return message.reply('Please provide some code to eval!');
        }
        try {
            let result = await eval(code);
            if (typeof result !== 'string') {
                result = util_1.inspect(result);
            }
            if (JSON.stringify(result).length > 2000) {
                message.channel.send('Content was too long, logged instead.');
                return console.log(result);
            }
            return message.channel.send(result, { code: 'js' });
        }
        catch (err) {
            if (JSON.stringify(err.message).length > 2000) {
                message.channel.send('Error too long, logged instead.');
                return console.log(err);
            }
            return message.channel.send(err, { code: 'js' });
        }
    }
};
//# sourceMappingURL=eval.js.map