import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { CardPerson, SearchBar } from 'components';
import { usePeopleStore } from 'hooks';
import { useEffect } from 'react';

export function PeopleList() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { people, getPeople } = usePeopleStore();

    useEffect(() => {
        getPeople();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center pt">
            <SearchBar />

            <ul className="w-11/12 sm:w-[37rem] mt-24">
                {people.map((person) => {
                    return (
                        <li key={person.id}>
                            <CardPerson
                                data={person}
                                onSelect={(id) => navigate(`/people/${id}`)}
                            />
                        </li>
                    );
                })}
            </ul>

            <button
                className="btn btn-md btn-primary mt-10 sm:btn-lg fixed bottom-10 right-10"
                onClick={() => navigate('/people/new')}
            >
                <MdOutlineAddCircleOutline size="1.5rem" className="mr-2" />
                {t('people.list.add-new')}
            </button>
        </div>
    );
}
