import { SaveOptions } from 'mongoose';

interface Save {
    (arg0?: SaveOptions)
}

export interface MemberHistory {
    Guild: string;
    Member: string;
    Bans: number;
    Kicks: number;
    Mutes: number; 
    Warns: number;
    Softbans: number;
    RecentActions: Array<string>;
    save: Save;
}
