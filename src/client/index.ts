import { Command, Event, Config } from '../interfaces';
import { Client, Collection } from 'discord.js';
import JsonConfig from '../config/bot.json';
import path from 'path';
import { readdirSync } from 'fs';

class Sniper extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public config: Config = JsonConfig;
    public async init() : Promise<void> {
        this.login(this.config.token);

        const commandPath = path.join(__dirname, "..", "handler", "commands");
        readdirSync(commandPath).forEach(dir => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter(file => file.endsWith('.ts'));
            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                if (!command.name) {
                    throw new Error('Command name doesn\'t exist');
                }
                this.commands.set(command.name, command);
                if (command.aliases && command.aliases.length !== 0) {
                    command.aliases.forEach((aliase: string) => {
                        this.aliases.set(aliase, command);
                    });
                }
            }
        });

        const eventPath = path.join(__dirname, "..", "handler", "events");
        readdirSync(eventPath).forEach(async file => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}

export default Sniper;