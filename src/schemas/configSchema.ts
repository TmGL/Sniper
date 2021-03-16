import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    Guild: String,
    ModRoleId: String,
    MutedRoleId: String
});

export const configSchema = mongoose.model('server-config', schema);