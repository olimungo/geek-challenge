import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload';
import { defineRoutes as definePersonRoutes } from './controllers';

const app = express();
const PORT = process.env.PORT || 9000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

(async () => {
    app.use(cors({ origin: CORS_ORIGIN }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(fileUpload());

    definePersonRoutes(app);

    app.listen(PORT, () => {
        console.log(`> Server is running at http://localhost:${PORT}`);
    });
})();
