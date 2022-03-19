import create from 'zustand';
import { Person, sortPeople } from 'models';
import {
    getPerson,
    getPeople,
    searchPeople,
    updatePerson,
    uploadAvatar,
    deletePerson,
    createPeople,
    deletePeople,
    countPeople,
} from 'services';

const DEFAULT_LIST_LIMIT = 25;

interface PeopleStore {
    recordsCount: number;
    setRecordsCount: (recordsCount: number) => void;
    pattern: string;
    setPattern: (pattern: string) => void;
    people: Person[];
    count: number;
    getPerson: (id: string) => Promise<Person>;
    getPeople: (force?: boolean) => void;
    getMorePeople: () => void;
    searchPeople: (pattern: string) => void;
    updatePerson: (person: Person) => Promise<string>;
    deletePerson: (id: string) => void;
    uploadAvatar: (id: string, data: FormData) => void;
    createPeople: (count: number, withAvatar: boolean) => void;
    deletePeople: () => void;
    countPeople: () => void;
}

export const usePeopleStore = create<PeopleStore>((set, get) => {
    let lastIndex = 0;

    return {
        recordsCount: DEFAULT_LIST_LIMIT,
        setRecordsCount: (recordsCount) => set({ recordsCount }),
        pattern: '',
        setPattern: (pattern) => set({ pattern }),
        people: [],
        count: 0,
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
            const recordsCount = get().recordsCount;

            if (force || !get().people.length) {
                lastIndex = 0;
                set({ people: await getPeople(lastIndex, recordsCount) });
                lastIndex += recordsCount;
            }
        },
        getMorePeople: async () => {
            const recordsCount = get().recordsCount;
            const morePeople = await getPeople(lastIndex, recordsCount);

            set({ people: [...get().people, ...morePeople] });

            lastIndex += recordsCount;
        },
        searchPeople: async (pattern) => {
            const people = await searchPeople(pattern);
            set({ people });
        },
        updatePerson: async (person) => {
            return updatePerson(person).then((response) => {
                let count = get().count;

                if (person.id === 'new') {
                    person.id = response.id;
                    count += 1;
                }

                set((state) => ({
                    people: [
                        ...state.people.filter((p) => p.id !== person.id),
                        person,
                    ].sort(sortPeople),
                    count,
                }));

                return person.id;
            });
        },
        deletePerson: async (id: string) => {
            set((state) => ({
                people: [...state.people.filter((p) => p.id !== id)].sort(
                    sortPeople
                ),
                count: get().count - 1,
            }));

            return deletePerson(id);
        },
        uploadAvatar: async (id, data) => uploadAvatar(id, data),
        createPeople: async (count, withAvatar) => {
            set({ people: [] });
            createPeople(count, withAvatar);

            setTimeout(() => {
                get().getPeople(true);
                get().countPeople();
            }, 1000);
        },
        deletePeople: async () => {
            set({ people: [], count: 0 });
            deletePeople();
        },
        countPeople: async () => {
            set({ count: await countPeople() });
        },
    };
});
