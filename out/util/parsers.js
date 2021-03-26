"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUser = exports.parseRole = exports.parseMember = void 0;
function parseMember(guild, mention) {
    if (!mention)
        return undefined;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
    }
    return guild.members.cache.get(mention);
}
exports.parseMember = parseMember;
function parseRole(guild, mention) {
    if (!mention)
        return undefined;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('&')) {
            mention = mention.slice(1);
        }
    }
    return guild.roles.cache.get(mention);
}
exports.parseRole = parseRole;
function parseUser(client, mention) {
    if (!mention)
        return undefined;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
    }
    return client.users.cache.get(mention);
}
exports.parseUser = parseUser;
//# sourceMappingURL=parsers.js.map