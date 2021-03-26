"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLast(arr, amount) {
    if (!arr)
        return undefined;
    return arr.slice(Math.max(arr.length - amount, 0));
}
exports.default = getLast;
//# sourceMappingURL=getLast.js.map