import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { Person, sortPeople } from 'models';
import { CardPerson, SearchBar } from 'components';

export function PeopleList() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [people, setPeople] = useState<Person[]>([]);

    const getPeople = () => {
        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people`
        )
            .then((response) => response.json())
            .then((people: Person[]) => setPeople(people.sort(sortPeople)));
    };

    useEffect(() => {
        getPeople();
    }, []);

    const handleSelect = (id: string) => navigate(`/people/${id}`);

    const handleSearch = (pattern: string) => {
        if (pattern) {
            fetch(
                `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people/search/${pattern}`
            )
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    return response;
                })
                .then((people) => setPeople(people));
        } else {
            getPeople();
        }
    };

    return (
        <div className="flex flex-col items-center pt">
            {/* <h1 className="text-3xl sm:text-5xl p-1 sm:p-4">
                {t('people.list.title')}
            </h1> */}

            <SearchBar onSearch={handleSearch} />

            <ul className="w-11/12 sm:w-[37rem] mt-10">
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
                {t('people.list.add-new')}
            </button>
        </div>
    );
}
