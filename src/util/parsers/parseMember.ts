import { Guild, GuildMember } from 'discord.js';

export default function parseMember(guild: Guild, mention: string) : GuildMember | undefined {
	if (!mention) return undefined;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
	}

	return guild.members.cache.get(mention);
}
