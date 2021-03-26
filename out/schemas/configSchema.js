"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    Guild: String,
    ModRoleId: String,
    MutedRoleId: String
});
exports.configSchema = mongoose_1.default.model('server-config', schema);
//# sourceMappingURL=configSchema.js.map