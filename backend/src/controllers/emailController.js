import {v4 as uuid} from 'uuid';
import {emailQueue} from '../queues/emailQueue.js';
import pool from '../config/db.js';

export async function scheduleEmail(req,res){

    const {sender_email, recipient_email, subject,body,scheduled_at} = req.body;

    const id = uuid();

    await pool.query(
    `INSERT INTO emails 
     (id, sender_email, recipient_email, subject, body, scheduled_at)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [id, sender_email, recipient_email, subject, body, scheduled_at]
  );

  const delay = new Date(scheduled_at).getTime() - Date.now();

  await emailQueue.add(
    'send-email',
    {id , sender_email,recipient_email, subject, body},
    {delay}
  );

  res.json({success : true});

}
export async function getScheduledEmails(req, res) {
  const result = await pool.query(
    "SELECT recipient_email AS email, subject, scheduled_at AS time, status FROM emails WHERE status = 'scheduled' ORDER BY scheduled_at ASC"
  );

  res.json(result.rows);
}

export async function getSentEmails(req, res) {
  const result = await pool.query(
    "SELECT recipient_email AS email, subject, sent_at AS time, status FROM emails WHERE status = 'sent' ORDER BY sent_at DESC"
  );

  res.json(result.rows);
}
