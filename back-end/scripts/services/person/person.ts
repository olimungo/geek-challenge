import { createClient } from 'redis';
type RedisClientType = ReturnType<typeof createClient>;

export async function getPerson(redis: RedisClientType, id: string) {
    const person = await redis.hGetAll(`person:${id}`);
    person.id = id;

    return person;
}

export function setPerson(redis: RedisClientType, id: string, person: any) {
    const personId = `person:${id}`;

    redis.hSet(personId, 'firstname', person.firstname);
    redis.hSet(personId, 'lastname', person.lastname);
    redis.hSet(personId, 'address', person.address);
    redis.hSet(personId, 'city', person.city);
    redis.hSet(personId, 'country', person.country);

    updateIndex(redis, 'person:firstname', id, person.firstname);
    updateIndex(redis, 'person:lastname', id, person.lastname);
    updateIndex(redis, 'person:address', id, person.address);
    updateIndex(redis, 'person:city', id, person.city);
    updateIndex(redis, 'person:country', id, person.country);
}

export async function deletePerson(redisClient: RedisClientType, id: string) {
    const dbId = `person:${id}`;

    await redisClient.del(dbId);
    await deleteValueInPersonIndices(redisClient, id);

    return `{"id": "${id}"}`;
}

export async function deleteValueInIndex(
    redis: RedisClientType,
    index: string,
    id: string
) {
    const scan = await redis.zScan(index, 0, { MATCH: `*${id}*` });

    await Promise.all(
        scan.members.map(async (member) => {
            await redis.zRem(index, member.value);
        })
    );
}

export async function updateIndex(
    redis: RedisClientType,
    key: string,
    id: string,
    value: string
) {
    const index = `index:${key}`;

    await deleteValueInIndex(redis, index, id);

    await redis.zAdd(index, {
        score: 0,
        value: `${value}:${id}`,
    });
}

export async function deleteValueInPersonIndices(
    redis: RedisClientType,
    id: string
) {
    await deleteValueInIndex(redis, `index:person:firstname`, id);
    await deleteValueInIndex(redis, `index:person:lastname`, id);
    await deleteValueInIndex(redis, `index:person:address`, id);
    await deleteValueInIndex(redis, `index:person:city`, id);
    await deleteValueInIndex(redis, `index:person:country`, id);
}
