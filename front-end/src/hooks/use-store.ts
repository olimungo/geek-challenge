import { Person } from 'models';

type StoreType = {
    appTitle: string;
    people: Person[];
};

const storeInit: StoreType = {
    appTitle: 'Test title',
    people: [],
};

const StoreSingleton = (function () {
    let instance = storeInit;

    function createInstance() {
        return instance;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

export function useStore() {
    return StoreSingleton.getInstance();
}
