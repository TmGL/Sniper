import { SaveOptions } from 'mongoose';

interface Save {
    (arg0?: SaveOptions)
}

interface LastAction {
    author: string;
    action: string,
    date: number,
    reason: string
}

export interface MemberHistory {
    Guild: string;
    Member: string;
    Bans: number;
    Kicks: number;
    Mutes: number;
    Warns: number;
    Softbans: number;
    LastAction: LastAction;
    save: Save;
}
