"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseMember(client, mention) {
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
exports.default = parseMember;
//# sourceMappingURL=parseUser.js.map