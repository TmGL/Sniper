import { Command, ServerConfig } from '../../../interfaces';
import { configSchema as Schema } from '../../../schemas/configSchema';
import { parseRole } from '../../../util';

export const command: Command = {
    name: 'modrole',
    description: 'Set\'s the mod role for the server. The people with this role can use moderation commands.',
    usage: 'modrole <set/remove> <role>',
    run: async (client, message, args) => {
        if (!message.member.permissions.has(['MANAGE_GUILD', 'MANAGE_ROLES'])) return;

        if (!args.length) {
            return message.reply('Please provide a valid option! \n\nValid options: `set`, `remove`, `create`');
        }

        await Schema.findOne({
            Guild: message.guild.id
        }, async (err: Error, data: ServerConfig) => {
            if (err) {
                throw err;
            }

            if (args[0]?.toLowerCase() === "set") {
                if (!args[1]) {
                    return message.reply('Please mention a role or role id!');
                }

                const role = parseRole(message.guild, args[1]);

                if (!role) {
                    return message.reply('I couldn\'t find the role specified!');
                }

                if (data) {
                    data.ModRoleId = role.id;
                    data.save();
                    return message.channel.send(`The mod role has been set to **${role.name}**`);
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        ModRoleId: role.id
                    }).save();
                    return message.channel.send(`The mod role has been set to **${role.name}**`);
                }
            } else if (args[0]?.toLowerCase() === "remove") {
                if (data) {
                    data.delete();
                    return message.channel.send(`The mod role has been removed successfully!`);
                } else {
                    return message.channel.send('The mod role is not setup for this server!');
                }
            }
        });
    }
}