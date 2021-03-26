"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseMember(guild, mention) {
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
exports.default = parseMember;
//# sourceMappingURL=parseRole.js.map