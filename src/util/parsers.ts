import Client from '../client';
import { Guild, GuildMember, Role, User } from 'discord.js';

export function parseMember(guild: Guild, mention: string) : GuildMember | undefined {
	if (!mention) return undefined;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
	}

	return guild.members.cache.get(mention);
}

export function parseRole(guild: Guild, mention: string) : Role | undefined {
	if (!mention) return undefined;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('&')) {
			mention = mention.slice(1);
		}
	}

	return guild.roles.cache.get(mention);
}

export function parseUser(client: Client, mention: string) : User | undefined {
	if (!mention) return undefined;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}		
	}

	return client.users.cache.get(mention);
}
