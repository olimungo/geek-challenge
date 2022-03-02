import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { Person, sortPeople } from 'models';
import { CardPerson } from 'components';

export function PeopleList() {
    const navigate = useNavigate();
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people`
        )
            .then((response) => response.json())
            .then((people: Person[]) => setPeople(people.sort(sortPeople)));
    }, []);

    const handleSelect = (id: string) => navigate(`/people/${id}`);

    return (
        <div className="flex flex-col items-center">
            <ul className="w-11/12 sm:w-[37rem]">
                {people.map((person) => {
                    return (
                        <li key={person.id}>
                            <CardPerson data={person} onSelect={handleSelect} />
                        </li>
                    );
                })}
            </ul>

            <button
                className="btn btn-md btn-primary mt-10 sm:btn-lg fixed bottom-10 right-10"
                onClick={() => handleSelect('new')}
            >
                <MdOutlineAddCircleOutline size="1.5rem" className="mr-2" />
                ADD NEW
            </button>
        </div>
    );
}
