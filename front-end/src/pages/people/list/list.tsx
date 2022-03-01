import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import './list.css';

type Person = {
    id: string;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    country: string;
};

function PeopleList() {
    const navigate = useNavigate();
    const [people, setPeople] = useState<any[]>([]);

    useEffect(() => {
        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people`
        )
            .then((response) => response.json())
            .then((people: Person[]) =>
                setPeople(
                    people.sort((a, b) =>
                        a.firstname + a.lastname > b.firstname + b.lastname
                            ? 1
                            : -1
                    )
                )
            );
    }, []);

    const handleSelect = (id: string) => navigate(`/people/${id}`);

    return (
        <div className="people-list">
            <ul>
                {people.map((person) => {
                    return (
                        <li
                            className="bg-slate-300 text-slate-700"
                            key={person.id}
                            onClick={() => handleSelect(person.id)}
                        >
                            {person.firstname} {person.lastname}
                        </li>
                    );
                })}
            </ul>

            <button
                type="button"
                className="btn btn-primary mt-10 text-xl"
                onClick={() => handleSelect('new')}
            >
                <MdOutlineAddCircleOutline size="1.5rem" className="mr-2" /> ADD
                NEW
            </button>
        </div>
    );
}

export default PeopleList;
