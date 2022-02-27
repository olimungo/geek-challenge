import { v4 as uuidv4 } from 'uuid';
import * as cors from 'cors';
import * as express from 'express';
import redis from './redis';
import * as bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 9000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/people/:id', async (req, res) => {
    const people = JSON.parse(await redis.get(req.params.id));
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

    redis.set(id, JSON.stringify(req.body));

    return res.send(`{"id": "${id}"}`);
});

app.delete('/people/:id', async (req, res) => {
    const id = req.params.id;
    await redis.del(id);

    return res.send(`{"id": "${id}"}`);
});

app.get('/people', async (req, res) => {
    const ids = await redis.keys('*');
    const result = [];

    const people = await Promise.all(
        ids.map(async (id) => {
            const person = JSON.parse(await redis.get(id));
            person.id = id;
            result.push(person);
        })
    );

    return res.send(JSON.stringify(result));
});

app.listen(PORT, () => {
    console.log(`> Server is running at https://localhost:${PORT}`);
});
