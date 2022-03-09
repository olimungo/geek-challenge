import create from 'zustand';
import { Person, sortPeople } from 'models';
import {
    getPerson,
    getPeople,
    searchPeople,
    updatePerson,
    uploadAvatar,
    deletePerson,
} from 'services';

const DEFAULT_LIST_LIMIT = 100;

interface PeopleStore {
    limit: number;
    setLimit: (limit: number) => void;
    pattern: string;
    setPattern: (pattern: string) => void;
    people: Person[];
    getPerson: (id: string) => Promise<Person>;
    getPeople: (force?: boolean) => void;
    searchPeople: (pattern: string) => void;
    updatePerson: (person: Person) => Promise<string>;
    deletePerson: (id: string) => void;
    uploadAvatar: (id: string, data: FormData) => void;
}

export const usePeopleStore = create<PeopleStore>((set, get) => ({
    limit: DEFAULT_LIST_LIMIT,
    setLimit: (limit) => {
        set({ limit, pattern: '' });
        get().getPeople(true);
    },
    pattern: '',
    setPattern: (pattern) => set({ pattern }),
    people: [],
    getPerson: async (id) => {
        const people = get().people;
        const index = people.findIndex((person) => person.id === id);

        if (index > -1) {
            return people[index];
        } else {
            return getPerson(id);
        }
    },
    getPeople: async (force: boolean = false) => {
        if (force || !get().people.length) {
            set({ people: await getPeople(get().limit) });
        }
    },
    searchPeople: async (pattern) =>
        set({ people: await searchPeople(pattern) }),
    updatePerson: async (person) => {
        set((state) => ({
            people: [
                ...state.people.filter((p) => p.id !== person.id),
                person,
            ].sort(sortPeople),
        }));

        return updatePerson(person).then((response) => response.id);
    },
    deletePerson: async (id: string) => {
        set((state) => ({
            people: [...state.people.filter((p) => p.id !== id)].sort(
                sortPeople
            ),
        }));

        return deletePerson(id);
    },
    uploadAvatar: async (id, data) => uploadAvatar(id, data),
}));
