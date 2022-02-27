import { createClient } from 'redis';
const { promisify } = require('util');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6380';

console.log(`> Connecting to ${REDIS_URL}`);

const redis = createClient({ url: REDIS_URL });
redis.connect();

redis.on('error', (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.log('> Redis container not yet available...');
    }
});

redis.on('connect', () => console.log(`> Connected to Redis`));

export default redis;
