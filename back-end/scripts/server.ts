import { v4 as uuidv4 } from 'uuid';
import * as cors from 'cors';
import * as express from 'express';
import redis from './redis';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';
import { networkInterfaces } from 'os';
import { writeFile, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

const AVATARS_FOLDER = path.join(__dirname, '../avatars');
const ASSETS_FOLDER = path.join(__dirname, 'assets');

const app = express();
const PORT = process.env.PORT || 9000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(fileUpload());

// Get the IP address of the host
const ifaces = networkInterfaces();
let ipAddress = '';

for (var dev in ifaces) {
    ifaces[dev].filter((details) =>
        details.family === 'IPv4' && details.internal === false
            ? (ipAddress = details.address)
            : undefined
    );
}

// Check if the folder for saving the avatars images exist, if not create it
if (!existsSync(AVATARS_FOLDER)) {
    mkdirSync(AVATARS_FOLDER);
}

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

app.get('/people/:id/avatar', async (req, res) => {
    if (existsSync(`${AVATARS_FOLDER}/${req.params.id}`)) {
        res.sendFile(`${req.params.id}`, { root: AVATARS_FOLDER });
    } else {
        res.sendFile('no-avatar.png', { root: ASSETS_FOLDER });
    }
});

app.get('/people/:id', async (req, res) => {
    const people = JSON.parse(await redis.get(`person:${req.params.id}`));
    people.id = req.params.id;

    return res.send(JSON.stringify(people));
});

app.put('/people/:id', (req, res) => {
    let id = req.params.id;

    if (id === 'new') {
        id = uuidv4();
    } else {
        delete req.body.id;
    }

    const dbId = `person:${id}`;

    redis.set(dbId, JSON.stringify(req.body));

    return res.send(`{"id": "${id}"}`);
});

app.delete('/people/:id', async (req, res) => {
    const id = `person:${req.params.id}`;
    await redis.del(id);

    return res.send(`{"id": "${id}"}`);
});

app.get('/people', async (req, res) => {
    const ids = await redis.keys('person:*');
    const result = [];

    const people = await Promise.all(
        ids.map(async (id) => {
            const person = JSON.parse(await redis.get(id));
            person.id = id.split(':')[1];
            result.push(person);
        })
    );

    return res.send(JSON.stringify(result));
});

app.listen(PORT, () => {
    console.log(`> Server is running at https://${ipAddress}:${PORT}`);
});
