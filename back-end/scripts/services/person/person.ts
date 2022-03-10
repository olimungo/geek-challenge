import { writeFile, existsSync, mkdirSync, readdir, unlink } from 'fs';
import * as path from 'path';
import redisClient from '../../redis-client';

// Save avatars in the folders where the base script was launched
const AVATARS_FOLDER = path.join(process.cwd(), 'avatars');
const ASSETS_FOLDER = path.join(__dirname, '../../assets');

// Check if the folder for saving the avatars images exist, if not create it
if (!existsSync(AVATARS_FOLDER)) {
    mkdirSync(AVATARS_FOLDER);
}

export async function getPerson(id: string) {
    const redis = await redisClient();
    const person = await redis.hGetAll(`person:${id}`);
    person.id = id;

    return person;
}

export async function getPeople(limit: number) {
    const redis = await redisClient();
    const ids = await redis.zRange(
        'index:person:firstname',
        0,
        limit === -1 ? limit : limit - 1
    );
    const people = [];

    await Promise.all(
        ids.map(async (id: string) => {
            const splitId = id.split(':');

            people.push(await getPerson(splitId[splitId.length - 1]));
        })
    );

    return people;
}

export async function setPerson(id: string, person: any) {
    const redis = await redisClient();
    const personId = `person:${id}`;

    await redis.hSet(personId, 'firstname', person.firstname);
    await redis.hSet(personId, 'lastname', person.lastname);
    await redis.hSet(personId, 'address', person.address);
    await redis.hSet(personId, 'city', person.city);
    await redis.hSet(personId, 'country', person.country);

    await updateIndex('person:firstname', id, person.firstname);
    await updateIndex('person:lastname', id, person.lastname);
    await updateIndex('person:address', id, person.address);
    await updateIndex('person:city', id, person.city);
    await updateIndex('person:country', id, person.country);
}

export async function deletePerson(id: string) {
    const redis = await redisClient();
    const dbId = `person:${id}`;

    await redis.del(dbId);
    await deleteValueInPersonIndices(id);

    return `{"id": "${id}"}`;
}

export async function deleteValueInIndex(index: string, id: string) {
    const redis = await redisClient();
    const scan = await redis.zScan(index, 0, {
        MATCH: `*${id}*`,
        // Redis might not send back a result when there are too few items in the set,
        // so kind of forcing it by specifying a large count.
        COUNT: 100000,
    });

    await Promise.all(
        scan.members.map(async (member) => {
            await redis.zRem(index, member.value);
        })
    );
}

export async function updateIndex(key: string, id: string, value: string) {
    const redis = await redisClient();
    const index = `index:${key}`;

    await deleteValueInIndex(index, id);

    if (value) {
        await redis.zAdd(index, {
            score: 0,
            value: `${value.toLowerCase()}:${id}`,
        });
    }
}

export async function deleteValueInPersonIndices(id: string) {
    await deleteValueInIndex(`index:person:firstname`, id);
    await deleteValueInIndex(`index:person:lastname`, id);
    await deleteValueInIndex(`index:person:address`, id);
    await deleteValueInIndex(`index:person:city`, id);
    await deleteValueInIndex(`index:person:country`, id);
}

export async function getIdsFromPattern(index: string, pattern: string) {
    const redis = await redisClient();
    const result = await redis.zScan(index, 0, {
        MATCH: `*${pattern}*`,
        // Redis might not send back a result when there are too few items in the set,
        // so kind of forcing it by specifying a large count.
        COUNT: 100000,
    });

    return result.members.map((hit) => {
        const split = hit.value.split(':');
        return split[split.length - 1];
    });
}

export function saveAvatar(id: string, data: any, name: any) {
    writeFile(`${AVATARS_FOLDER}/${id}`, data, (err) => {
        if (err) {
            console.log(
                `File ${name} could not be saved to the file system: ${err}`
            );
        } else {
            console.log(`File ${name} saved to the file system`);
        }
    });
}

export function getAvatar(response, id: string) {
    if (existsSync(`${AVATARS_FOLDER}/${id}`)) {
        response.sendFile(`${id}`, { root: AVATARS_FOLDER });
    } else {
        response.sendFile('no-avatar.png', { root: ASSETS_FOLDER });
    }
}

export async function deletePeople() {
    const redis = await redisClient();
    const peopleKeys = await redis.keys('person:*');
    const peopleIndices = await redis.keys('index:person:*');

    peopleKeys.map((key: string) => redis.del(key));
    peopleIndices.map((key: string) => redis.del(key));

    readdir(AVATARS_FOLDER, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            unlink(path.join(AVATARS_FOLDER, file), (err) => {
                if (err) throw err;
            });
        }
    });
}
