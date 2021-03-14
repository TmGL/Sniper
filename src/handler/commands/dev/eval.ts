import { Command } from '../../../interfaces';
import { inspect } from 'util';

export const command: Command = {
    name: 'eval',
    description: 'Evaluates code.',
    aliases: ['ev'],
    usage: 'eval <code>',
    run: async (client, message, args) => {
        if (message.author.id !== '378912969670787073') return;

        const code = args.join(' ');
        if (!code) {
            return message.channel.send('Please provide some code to eval!');
        }

        try {
            let result = await eval(code);
            if (typeof result !== 'string') {
                result = inspect(result);
            }

            if (JSON.stringify(result).length > 2000) {
                message.channel.send('Content was too long, logged instead.');
                return console.log(result);
            }

            return message.channel.send(result, { code: 'js' });
        } catch (err) {
            if (JSON.stringify(err.message).length > 2000) {
                message.channel.send('Error too long, logged instead.');
                return console.log(err);
            }

            return message.channel.send(err, { code: 'js' });
        }
    }
}