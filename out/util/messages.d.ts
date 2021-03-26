import { GuildMember, User } from 'discord.js';
export declare const messages: {
    commands: {
        mod: {
            errors: {
                args: {
                    general: (action?: string) => string;
                    unban: string;
                };
                invalid_member: string;
                invalid_id: string;
                invalid_user: string;
                not_bannable: string;
                not_kickable: string;
                role_hierarchy: string;
                no_history: string;
                no_perms: (action?: string) => string;
                already: {
                    muted: string;
                    unmuted: string;
                    unbanned: string;
                };
                no_muted_role: string;
                muted_role_not_editable: string;
            };
            success: {
                send: (member: GuildMember, action?: string) => string;
                unban: (user: User) => string;
                db: {
                    recent: (action: string, author: string, date: number, reason: string) => string;
                };
            };
        };
        config: {
            errors: {
                args: {
                    general: (arr: Array<string>) => string;
                    set: string;
                };
            };
            success: {};
        };
        dev: {};
    };
};
