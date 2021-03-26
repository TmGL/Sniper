"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function capitalise(input) {
    if (typeof input === 'string' && input.length > 0) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    throw new Error('input should be a non-emty string');
}
exports.default = capitalise;
//# sourceMappingURL=capitalise.js.map