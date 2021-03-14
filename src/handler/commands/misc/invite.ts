import { Command } from "../../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'invite',
    description: 'Sends the invite link for the bot',
    usage: 'invite',
    run: (client, message) => {
        return message.channel.send(
            new MessageEmbed()
                .setTitle('Invite Link')
                .setDescription(`Click [here](${client.config.invite}) to invite the bot!`)
                .setColor('RANDOM')
                .setFooter('Enjoy the bot!')
        );
    }
}