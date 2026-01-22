import {Worker} from 'bullmq';
import { emailQueue } from '../queues/emailQueue.js';
import { transporter } from '../config/mail.js';
import pool from '../config/db.js';
import redis from '../config/redis.js';
import { canSendEmail } from '../utils/rateLimiter.js';

new Worker(
    'email-queue',

    async job =>{
        const email = job.data;

        const allowed = await canSendEmail(email.sender_email);

        if(!allowed){
            throw new Error('Rate limit exceeded for sending emails');
        }

        await transporter.sendMail({
           from : email.sender_email,
           to : email.recipient_email,
           subject : email.subject,
           text : email.body
        });

        await new Promise( r => setTimeout(r,process.env.EMAIL_MIN_DELAY_MS));
    },
    {
        connection: redis,
        concurrency : Number(process.env.WORKER_CONCURRENCY) || 5,
    }
)