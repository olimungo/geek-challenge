import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { setPerson } from '../services';
const fs = require('fs');
const client = require('https');

// faker.setLocale('fr');

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(
                    new Error(
                        `Request Failed: ${res.statusCode} for ${url} (${filepath})`
                    )
                );
            }
        });
    });
}

export async function createPeople(count: number, withAvatar: boolean) {
    for (let i = 0; i < count; i++) {
        const id = uuidv4();

        setPerson(id, {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            country: faker.address.country(),
        });

        if (withAvatar) {
            await downloadImage(faker.image.avatar(), `avatars/${id}`)
                .then(console.log)
                .catch(console.error);
        }
    }
}
