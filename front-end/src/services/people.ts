import { Person, sortPeople } from 'models';
import { backEnd } from 'services';

export const getPerson = async (id: string) => {
    return fetch(`${backEnd}/people/${id}`).then((response) => response.json());
};

export const getPeople = (limit: number) => {
    return fetch(`${backEnd}/people?limit=${limit}`)
        .then((response) => response.json())
        .then((people: Person[]) => people.sort(sortPeople));
};

export const searchPeople = (pattern: string) => {
    if (pattern) {
        return fetch(`${backEnd}/people/search/${pattern}`)
            .then((response) => response.json())
            .then((people: Person[]) => people.sort(sortPeople));
    } else {
        return new Promise<Person[]>((resolve) => resolve([]));
    }
};

export const updatePerson = (person: Person) => {
    return fetch(`${backEnd}/people/${person.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
    }).then((response) => response.json());
};

export const deletePerson = (id: string) => {
    return fetch(`${backEnd}/people/${id}`, { method: 'DELETE' });
};

export const uploadAvatar = (id: string, data: FormData) => {
    return fetch(`${backEnd}/avatar/${id}`, {
        method: 'POST',
        body: data,
    });
};
