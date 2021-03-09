import { Guild } from 'discord.js';

export default function parseMember(guild: Guild, mention: string) {
	if (!mention) return undefined;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
	}

	return guild.members.cache.get(mention);
}
