import { Event } from '../../interfaces';
import { uri } from '../../config/dbconfig.json';
import mongoose from 'mongoose';

export const event: Event = {
    name: 'ready',
    run: client => {
        console.log(client.user.tag + ' is now ready!');

        mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: false
        }).then(() => {
            console.log('Connected to mongo!');
        });
    }
}