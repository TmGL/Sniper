"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const db_json_1 = require("../../config/db.json");
const bot_json_1 = require("../../config/bot.json");
const mongoose_1 = __importDefault(require("mongoose"));
exports.event = {
    name: 'ready',
    run: client => {
        console.log(client.user.tag + ' is now ready!');
        client.user.setActivity(bot_json_1.activity.name, { type: 'LISTENING' });
        mongoose_1.default.connect(db_json_1.uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to mongo!');
        });
    }
};
//# sourceMappingURL=ready.js.map