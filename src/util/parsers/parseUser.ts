import Client from '../../client';

export default function parseMember(client: Client, mention: string) {
	if (!mention) return undefined;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}