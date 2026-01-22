import  redis  from '../config/redis.js';

export async function canSendEmail(senderEmail) {
  const hourKey = `email:${senderEmail}:${new Date().getHours()}`;
  const count = await redis.incr(hourKey);

  if (count === 1) {
    await redis.expire(hourKey, 3600);
  }

  return count <= process.env.EMAIL_RATE_LIMIT_PER_HOUR;
}
