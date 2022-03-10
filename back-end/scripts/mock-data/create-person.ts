import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { setPerson } from '../services';
const fs = require('fs');
const client = require('https');

faker.setLocale('fr');

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
                reject(new Error(url));
            }
        });
    });
}

export async function createPeople(count: number, withAvatar: boolean) {
    const ids = [];

    for (let i = 0; i < count; i++) {
        const id = uuidv4();

        ids.push(id);

        setPerson(id, {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            country: faker.address.country(),
        });
    }

    let countSaved = 0;
    let countFailed = 0;

    if (withAvatar) {
        while (ids.length > 0) {
            const id = ids.pop();

            await new Promise((resolve) => {
                downloadImage(faker.image.avatar(), `avatars/${id}`)
                    .then((filepath) => {
                        console.log(`> File saved to ${filepath} `);
                        countSaved++;
                    })
                    .catch((url) => {
                        console.log(`X Getting ${url} failed for ${id} `);
                        ids.push(id);
                        countFailed++;
                    });

                // Throttle to prevent orverloading the system
                setTimeout(() => {
                    resolve(true);
                }, 50);
            });
        }
    }

    // Wait for the last downloads to finish
    setTimeout(() => {
        console.log(`Files saved to disk: ${countSaved}`);
        console.log(`Failed to save to disk: ${countFailed}`);
        console.log('ids', ids);
    }, 5000);
}
