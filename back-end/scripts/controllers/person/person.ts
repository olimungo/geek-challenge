import { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
    setPerson,
    getPerson,
    deletePerson,
    saveAvatar,
    getAvatar,
    getPeople,
    getIdsFromPattern,
} from '../../services';

export function defineRoutes(app: Express) {
    defineSearch(app);
    definePostAvatar(app);
    defineGetAvatar(app);
    defineGetPerson(app);
    definePutPerson(app);
    defineDeletePerson(app);
    defineGetPeople(app);
}

function defineSearch(app: Express) {
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
        return res.send(JSON.stringify(await getPeople(query.limit)));
    });
}
