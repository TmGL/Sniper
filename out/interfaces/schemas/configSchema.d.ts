import { SaveOptions, QueryOptions } from 'mongoose';
interface Save {
    (arg0?: SaveOptions): any;
}
interface Delete {
    (arg0?: QueryOptions): any;
}
export interface ServerConfig {
    Guild: string;
    ModRoleId: string;
    MutedRoleId: string;
    save: Save;
    delete: Delete;
}
export {};
