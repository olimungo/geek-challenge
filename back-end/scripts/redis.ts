import * as redis from 'redis';
const { promisify } = require('util');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';
const redisClient = redis.createClient(REDIS_URL);

redisClient.on('error', (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.log('> Redis container not yet available...');
    }
});

redisClient.on('connect', () =>
    console.log(`> Connected to Redis on ${REDIS_URL} `)
);

export default {
    ...redisClient,
    getAsync: promisify(redisClient.get).bind(redisClient),
    setAsync: promisify(redisClient.set).bind(redisClient),
    keysAsync: promisify(redisClient.keys).bind(redisClient),
    delAsync: promisify(redisClient.del).bind(redisClient),
    saddAsync: promisify(redisClient.sadd).bind(redisClient),
    smembersAsync: promisify(redisClient.smembers).bind(redisClient),
    sremAsync: promisify(redisClient.srem).bind(redisClient),
};