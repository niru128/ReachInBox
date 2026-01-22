import {Queue} from 'bullmq';
import redis from '../config/redis.js';

export const emailQueue = new Queue('emailQueue', {
    connection: redis,
})

//user: 'manb5hx4qgiajyfs@ethereal.email',
//   pass: 'rDDxt5Hu6XJJ3TWQNZ',