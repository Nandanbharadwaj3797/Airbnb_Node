import { Queue } from 'bullmq';
import { getRedisConnObject } from '../config/redis.config';

export const MAILER_QUEUE = "queue-mailer";

export const mailerQueue = new Queue(MAILER_QUEUE, {
    connection: getRedisConnObject(),
    // Local environment uses Redis 5.x; disable BullMQ's 6.2+ recommendation warning.
    skipVersionCheck: true,
});