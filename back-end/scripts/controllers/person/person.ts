import { Express } from 'express';
import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import {
    setPerson,
    deleteValueInPersonIndices,
    getPerson,
    deletePerson,
} from '../../services';

const AVATARS_FOLDER = path.join(__dirname, '../../../avatars');
const ASSETS_FOLDER = path.join(__dirname, '../../assets');

type RedisClientType = ReturnType<typeof createClient>;

// Check if the folder for saving the avatars images exist, if not create it
if (!existsSync(AVATARS_FOLDER)) {
    mkdirSync(AVATARS_FOLDER);
}

export function defineRoutes(app: Express, redisClient: RedisClientType) {
    defineSearch(app, redisClient);
    definePostAvatar(app);
    defineGetAvatar(app);
    defineGetPerson(app, redisClient);
    definePutPerson(app, redisClient);
    defineDeletePerson(app, redisClient);
    defineGetPeople(app, redisClient);
}

function defineSearch(app: Express, redisClient: RedisClientType) {
    app.get('/people/search/:pattern', async (req, res) => {
        const indices = [
            'index:person:firstname',
            'index:person:lastname',
            'index:person:address',
            'index:person:city',
            'index:person:country',
        ];

        let allHits = [];

        // Get corresponding ids from matching pattern in indices
        await Promise.all(
            indices.map(async (index) => {
                const hits = await getIdsFromPattern(
                    redisClient,
                    index,
                    req.params.pattern
                );

                allHits = [...allHits, ...hits];
            })
        );

        // Remove duplicates
        allHits = Array.from(new Set(allHits));

        // Get people related to the previous ids found
        const people = await Promise.all(
            allHits.map(async (id) => {
                return await getPerson(redisClient, id);
            })
        );

        return res.send(JSON.stringify(people));
    });
}

function definePostAvatar(app: Express) {
    app.post('/people/:id/avatar', async (req, res) => {
        const avatarFile: any = req.files.avatar;
        const id = req.params.id;

        writeFile(`${AVATARS_FOLDER}/${id}`, avatarFile.data, (err) => {
            if (err) {
                console.log(
                    `File ${avatarFile.name} could not be saved to the file system: ${err}`
                );
            } else {
                console.log(`File ${avatarFile.name} saved to the file system`);
            }
        });

        res.sendStatus(200);
    });
}

function defineGetAvatar(app: Express) {
    app.get('/people/:id/avatar', async (req, res) => {
        if (existsSync(`${AVATARS_FOLDER}/${req.params.id}`)) {
            res.sendFile(`${req.params.id}`, { root: AVATARS_FOLDER });
        } else {
            res.sendFile('no-avatar.png', { root: ASSETS_FOLDER });
        }
    });
}

function defineGetPerson(app: Express, redisClient: RedisClientType) {
    app.get('/people/:id', async (req, res) => {
        return res.send(
            JSON.stringify(await getPerson(redisClient, req.params.id))
        );
    });
}

async function definePutPerson(app: Express, redisClient: RedisClientType) {
    app.put('/people/:id', async (req, res) => {
        let id = req.params.id;

        if (id === 'new') {
            id = uuidv4();
        } else {
            delete req.body.id;
        }

        await setPerson(redisClient, id, req.body);

        return res.send(`{"id": "${id}"}`);
    });
}

function defineDeletePerson(app: Express, redisClient: RedisClientType) {
    app.delete('/people/:id', async (req, res) => {
        return res.send(await deletePerson(redisClient, req.params.id));
    });
}

function defineGetPeople(app: Express, redisClient: RedisClientType) {
    app.get('/people', async (req, res) => {
        const ids = await redisClient.keys('person:*');
        const result = [];

        const people = await Promise.all(
            ids.map(async (id) => {
                result.push(await getPerson(redisClient, id.split(':')[1]));
            })
        );

        return res.send(JSON.stringify(result));
    });
}

async function getIdsFromPattern(
    redisClient: RedisClientType,
    index: string,
    pattern: string
) {
    const result = await redisClient.zScan(index, 0, { MATCH: `*${pattern}*` });

    return result.members.map((hit) => {
        return hit.value.split(':')[1];
    });
}
