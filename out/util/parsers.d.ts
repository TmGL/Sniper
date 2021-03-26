import Client from '../client';
import { Guild, GuildMember, Role, User } from 'discord.js';
export declare function parseMember(guild: Guild, mention: string): GuildMember | undefined;
export declare function parseRole(guild: Guild, mention: string): Role | undefined;
export declare function parseUser(client: Client, mention: string): User | undefined;
