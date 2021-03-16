import { SaveOptions, QueryOptions } from 'mongoose';

interface Save {
    (arg0?: SaveOptions)
}

interface Delete {
    (arg0?: QueryOptions)
}

export interface ServerConfig {
    Guild: string;
    ModRoleId: string;
    MutedRoleId: string;
    save: Save;
    delete: Delete;
}
