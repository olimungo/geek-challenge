import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './list.css';

function PeopleList() {
    const navigate = useNavigate();
    const [people, setPeople] = useState<any[]>([]);

    useEffect(() => {
        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people`
        )
            .then((response) => response.json())
            .then((people) => setPeople(people));
    }, []);

    const handleSelect = (id: string) => navigate(`/people/${id}`);

    return (
        <div className="people-list">
            <ul>
                {people.map((person) => {
                    return (
                        <li
                            className="bg-orange-400"
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
                className="btn btn-primary mt-10"
                onClick={() => handleSelect('new')}
            >
                ADD NEW
            </button>
        </div>
    );
}

export default PeopleList;
