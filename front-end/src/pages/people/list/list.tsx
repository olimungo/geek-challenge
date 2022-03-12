import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { CardPerson, ResponsiveIcon, SearchBar } from 'components';
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
        <div className="flex flex-col items-center pt-3 mb-20 sm:mb-12">
            <SearchBar />

            <ul className="w-11/12 xs:w-96 md:w-[31rem] mt-24 overflow-scroll">
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
                className="btn btn-md btn-primary mt-10 fixed bottom-24 right-6 md:bottom-6"
                onClick={() => navigate('/people/new')}
            >
                <ResponsiveIcon icon={MdOutlineAddCircleOutline} />
                <div className="ml-2">{t('people.list.add-new')}</div>
            </button>
        </div>
    );
}
