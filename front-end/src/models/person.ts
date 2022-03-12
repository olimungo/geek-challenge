export type Person = {
    id: string;
    firstname: string;
    lastname: string;
    telephone: string;
    email: string;
    address?: string;
    city?: string;
    country?: string;
};

export function sortPeople(a: Person, b: Person) {
    return a.firstname + a.lastname > b.firstname + b.lastname ? 1 : -1;
}
