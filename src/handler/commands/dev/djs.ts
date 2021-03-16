import { Command } from '../../../interfaces';
import axios from 'axios';

export const command: Command = {
    name: 'docs',
    description: 'Get\'s data from the discord.js documentation.',
    aliases: ['djs'],
    usage: 'docs <query> [--src=branch]',
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply('Please provide a query!');
        }

        const split = args.join(' ').split('--src=');
        const query = split[0].trim();
        const src = split[1]?.trim() || 'stable';
        const url = `https://djsdocs.sorta.moe/v2/embed?src=${src}&q=${encodeURIComponent(query)}`;

        return axios.get(url).then(res => {
            return message.channel.send('', { embed: res.data });
        }).catch(() => {
            return message.reply(`There are no results for \`${query}\` in the \`${src}\` branch.`);
        });
    }
}