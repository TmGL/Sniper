"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms = void 0;
__exportStar(require("./functions"), exports);
__exportStar(require("./parsers"), exports);
__exportStar(require("./messages"), exports);
var ms_1 = require("./ms");
Object.defineProperty(exports, "ms", { enumerable: true, get: function () { return ms_1.ms; } });
//# sourceMappingURL=index.js.map