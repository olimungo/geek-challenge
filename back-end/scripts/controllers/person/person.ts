import { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createPeople } from '../../mock-data';
import {
    setPerson,
    getPerson,
    deletePerson,
    saveAvatar,
    getAvatar,
    getPeople,
    getIdsFromPattern,
    deletePeople as deletePeople,
    countPeople,
} from '../../services';

export function defineRoutes(app: Express) {
    defineSearch(app);
    definePostAvatar(app);
    defineGetAvatar(app);
    defineCountPeople(app);
    defineGetPeople(app);
    defineDeletePeople(app);
    defineCreatePeople(app);
    definePutPerson(app);
    defineGetPerson(app);
    defineDeletePerson(app);
}

function defineSearch(app: Express) {
    app.get('/people/search/:pattern', async (req, res) => {
        const indices = [
            'index:person:firstname',
            'index:person:lastname',
            'index:person:telephone',
            'index:person:email',
            'index:person:address',
            'index:person:city',
            'index:person:country',
        ];

        let allHits = [];

        // Get corresponding ids from matching pattern in indices
        await Promise.all(
            indices.map(async (index) => {
                const hits = await getIdsFromPattern(
                    index,
                    req.params.pattern.toLowerCase()
                );

                allHits = [...allHits, ...hits];
            })
        );

        // Remove duplicates
        allHits = Array.from(new Set(allHits));

        // Get people related to the previous ids found
        const people = await Promise.all(
            allHits.map(async (id) => {
                return await getPerson(id);
            })
        );

        return res.send(JSON.stringify(people));
    });
}

function definePostAvatar(app: Express) {
    app.post('/avatar/:id', async (req, res) => {
        const avatarFile: any = req.files.avatar;
        const id = req.params.id;

        saveAvatar(id, avatarFile.data, avatarFile.name);

        res.sendStatus(200);
    });
}

function defineGetAvatar(app: Express) {
    app.get('/avatar/:id', async (req, res) => {
        getAvatar(res, req.params.id);
    });
}

function defineGetPerson(app: Express) {
    app.get('/people/:id', async (req, res) => {
        return res.send(JSON.stringify(await getPerson(req.params.id)));
    });
}

async function definePutPerson(app: Express) {
    app.put('/people/:id', async (req, res) => {
        let id = req.params.id;

        if (id === 'new') {
            id = uuidv4();
        } else {
            delete req.body.id;
        }

        await setPerson(id, req.body);

        return res.send(`{"id": "${id}"}`);
    });
}

function defineDeletePerson(app: Express) {
    app.delete('/people/:id', async (req, res) => {
        return res.send(await deletePerson(req.params.id));
    });
}

function defineGetPeople(app: Express) {
    app.get('/people', async (req, res) => {
        const query: any = req.query;
        return res.send(
            JSON.stringify(
                await getPeople(Number(query.from), Number(query.recordsCount))
            )
        );
    });
}

function defineCountPeople(app: Express) {
    app.get('/people/count', async (req, res) => {
        return res.send(JSON.stringify(await countPeople()));
    });
}

function defineCreatePeople(app: Express) {
    app.get('/people/create', async (req, res) => {
        const query: any = req.query;

        createPeople(Number(query.count), query.withAvatar === 'true');

        return res.sendStatus(200);
    });
}

function defineDeletePeople(app: Express) {
    app.get('/people/delete', async (req, res) => {
        deletePeople();
        return res.sendStatus(200);
    });
}
