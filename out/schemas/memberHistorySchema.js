"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberHistorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    Guild: String,
    Member: String,
    Bans: Number,
    Kicks: Number,
    Mutes: Number,
    Warns: Number,
    Softbans: Number,
    RecentActions: [String]
});
exports.memberHistorySchema = mongoose_1.default.model('member-history', schema);
//# sourceMappingURL=memberHistorySchema.js.map