import { Command, Event, Config } from '../interfaces';
import { Client, Collection } from 'discord.js';
declare class Sniper extends Client {
    commands: Collection<string, Command>;
    events: Collection<string, Event>;
    aliases: Collection<string, Command>;
    config: Config;
    init(): Promise<void>;
}
export default Sniper;
