import { 
    Command,
    Event,
    Config
} from '../interfaces';
import { Client, Collection } from 'discord.js';
import JsonConfig from '../config/bot.json';
import path from 'path';
import fs from 'fs';

class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public config: Config = JsonConfig;
    public async init() {
        this.login(this.config.token);

        const commandPath = path.join(__dirname, "..", "handler", "commands");
        fs.readdirSync(commandPath).forEach(dir => {
            const commands = fs.readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith('.ts'));
            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                if (!command.name) {
                    throw new Error('Command name doesn\'t exist');
                }
                this.commands.set(command.name, command);
                if (command.aliases && command.aliases.length !== 0) {
                    command.aliases.forEach(aliase => {
                        this.aliases.set(aliase, command);
                    });
                }
            }
        });

        const eventPath = path.join(__dirname, "..", "handler", "events");
        fs.readdirSync(eventPath).forEach(async file => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}

export default Bot;