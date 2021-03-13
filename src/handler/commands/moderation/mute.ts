import ms from 'ms';
import { Command } from '../../../interfaces';
import { parseMember } from '../../../util';

export const command: Command = {
    name: 'mute',
    description: 'Mutes a member in the server.',
    aliases: ['m'],
    usage: 'mute <user> [time] [reason]',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_ROLES')) return;

        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.channel.send('I do not have permission to mute members!');
        }

        if (!args.length) {
            return message.channel.send('Please provide a valid member!');
        }

        let role = message.guild.roles.cache.find(r => r.name === 'Muted');
        const member = parseMember(message.guild, args[0]);

        if (!member) {
            return message.channel.send('I could not find the member specified!');
        }

        if (!role) {
            role = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'GREY',
                },
                reason: `Mute command used by ${message.author.tag}`
            });
            message.guild.channels.cache.forEach(channel => {
                channel.updateOverwrite(role, {
                    SEND_MESSAGES: false
                });
            });
        }

        if (!role.editable) {
            return message.channel.send('I cannot manage the muted role!');
        }

        if (member.roles.cache.has(role.id)) {
            return message.channel.send('That member is already muted!');
        }

        let parsedDuration: number;
        if (args[1]) {
            if (!isNaN(Number(args[1]))) {
                parsedDuration = ms(args[1] + ' minutes');
            } else {
                parsedDuration = ms(args[1]);
            }
        }

        try {
            await member.roles.add(role, parsedDuration ? args.slice(2).join(' ') : args.slice(1).join(' '));
            await message.channel.send(member.user.tag + ' was muted successfully!');

            if (parsedDuration) {
                setTimeout(() => {
                    member.roles.remove(role);
                }, parsedDuration);
            }
        } catch (err) {
            console.error(err);
        }
    }
}