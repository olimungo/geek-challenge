import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../redisClient';
import { setPerson } from '../services';

const TO_BE_CREATED_COUNT = 10;

// faker.setLocale('fr');

(async () => {
    await Promise.all(
        Array(TO_BE_CREATED_COUNT)
            .fill(0)
            .map(async (_) => {
                const id = uuidv4();

                await setPerson(redisClient, id, {
                    firstname: faker.name.firstName(),
                    lastname: faker.name.lastName(),
                    address: faker.address.streetAddress(),
                    city: faker.address.city(),
                    country: faker.address.country(),
                });
            })
    );

    setTimeout(() => {
        process.exit();
    }, 0);
})();
