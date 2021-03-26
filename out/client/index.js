"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bot_json_1 = __importDefault(require("../config/bot.json"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
class Sniper extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.config = bot_json_1.default;
    }
    async init() {
        this.login(this.config.token);
        const commandPath = path_1.default.join(__dirname, "..", "handler", "commands");
        fs_1.readdirSync(commandPath).forEach(dir => {
            const commands = fs_1.readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith('.ts'));
            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                if (!command.name) {
                    throw new Error('Command name doesn\'t exist');
                }
                this.commands.set(command.name, command);
                if (command.aliases && command.aliases.length !== 0) {
                    command.aliases.forEach((aliase) => {
                        this.aliases.set(aliase, command);
                    });
                }
            }
        });
        const eventPath = path_1.default.join(__dirname, "..", "handler", "events");
        fs_1.readdirSync(eventPath).forEach(async (file) => {
            const { event } = await Promise.resolve().then(() => __importStar(require(`${eventPath}/${file}`)));
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}
exports.default = Sniper;
//# sourceMappingURL=index.js.map