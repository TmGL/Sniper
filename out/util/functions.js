"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = exports.getLast = exports.capitalise = void 0;
function capitalise(input) {
    if (typeof input === 'string' && input.length > 0) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    throw new Error('input should be a non-emty string');
}
exports.capitalise = capitalise;
function getLast(arr, amount) {
    if (!arr)
        return undefined;
    return arr.slice(Math.max(arr.length - amount, 0));
}
exports.getLast = getLast;
function id() {
    return Math.random().toString(36).substr(4, 11);
}
exports.id = id;
//# sourceMappingURL=functions.js.map