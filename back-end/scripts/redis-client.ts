import { createClient } from 'redis';
type RedisClientType = ReturnType<typeof createClient>;

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const RedisSingleton = (function () {
    let instance;

    async function createInstance() {
        console.log(`> Connecting to ${REDIS_URL}`);

        const redisClient: RedisClientType = createClient({ url: REDIS_URL });

        redisClient.on('error', (error) => {
            if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                console.log('> Redis container not yet available...');
            }
        });

        redisClient.on('connect', () => console.log(`> Connected to Redis`));

        await redisClient.connect();

        return redisClient;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

const redisClient = () => {
    return RedisSingleton.getInstance();
};

export default redisClient;
