import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    Guild: String,
    Member: String,
    Bans: Number,
    Kicks: Number,
    Mutes: Number,
    Warns: Number,
    Softbans: Number,
    LastAction: Object
});

export const memberHistorySchema = mongoose.model('member-history', schema);