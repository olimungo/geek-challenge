import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './list.css';

function PeopleList() {
    const history = useHistory();
    const [people, setPeople] = useState<any[]>([]);

    useEffect(() => {
        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people`
        )
            .then((response) => response.json())
            .then((people) => setPeople(people));
    }, []);

    const handleSelect = (id: string) => history.push(`/people/${id}`);

    return (
        <div className="people-list">
            <ul>
                {people.map((person) => {
                    return (
                        <li
                            key={person.id}
                            onClick={() => handleSelect(person.id)}
                        >
                            {person.firstname} {person.lastname}
                        </li>
                    );
                })}
            </ul>

            <button type="button" onClick={() => handleSelect('new')}>
                ADD NEW
            </button>
        </div>
    );
}

export default PeopleList;
