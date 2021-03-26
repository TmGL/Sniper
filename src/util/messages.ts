import { GuildMember, User } from 'discord.js';

export const messages = {
    commands: {
        mod: {
            errors: {
                args: {
                    general: (action?: string) => {
                        return action ? `Please provide a valid member to ${action}!` : `Please provide a vliad member!`;
                    },
                    unban: 'Please provide a user ID to unban!'
                },
                invalid_member: 'I could not find the member specified!',
                invalid_id: 'That is not a valid ID!',
                invalid_user: 'I could not find a user with that ID!',
                not_bannable: 'I cannot ban that member!',
                not_kickable: 'I cannot kick that member!',
                role_hierarchy: 'That member has a higher role than you!',
                no_history: 'That member has no moderation history!',
                no_perms: (action: string = 'do this') => {
                    return `I do not have permission to ${action}!`;
                },
                already: {
                    muted: 'That member is already muted!',
                    unmuted: 'That member is not muted!',
                    unbanned: 'That user is not banned!'
                },
                no_muted_role: 'The muted role has not been setup for this server or a role called Muted, use the muterole command to set it up!',
                muted_role_not_editable: 'I cannot manage the muted role!',
            },
            success: {
                send: (member: GuildMember, action: string = 'punished') => {
                    return `**${member.user.tag}** was ${action} successfully!`;
                },
                unban: (user: User) => {
                    return `**${user.tag}** was unbanned successfully!`;
                },
                db: {
                    recent: (action: string, author: string, date: number, reason: string) => {
                        return `\`${action}\` by \`${author}\` on \`${new Date(date).toLocaleDateString()}\` for \`${reason}\``;
                    }
                }
            }
        },
        config: {
            errors: {
                args: {
                    general: (arr: Array<string>) => {
                        const options = [];
                        arr.forEach(element => {
                            if (!element.startsWith('`') && !element.endsWith('`')) {
                                element = element.replace(/`/g, '');
                            }

                            options.push(`\`${element}\``);
                        });

                        return arr ? `Please provide a valid option! \n\nValid options: ${options.join(', ')}` : `Please provide a valid option!`;
                    },
                    set: 'Please mention a role or role ID!'
                }
            },
            success: {
                
            }
        },
        dev: {
            
        }
    }
}
