import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';
import { networkInterfaces } from 'os';
import redisClient from './redisClient';
import { defineRoutes as definePersonRoutes } from './controllers';
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

definePersonRoutes(app, redisClient);

app.listen(PORT, () => {
    console.log(`> Server is running at https://${ipAddress}:${PORT}`);
});
