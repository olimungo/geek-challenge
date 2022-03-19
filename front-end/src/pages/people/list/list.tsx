import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { CardPerson, ResponsiveIcon } from 'components';
import { usePeopleStore } from 'hooks';

export function PeopleList() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { people, getPeople, getMorePeople } = usePeopleStore();
    const ul = useRef<HTMLUListElement>(null);

    useEffect(() => {
        getPeople();

        const onScroll = (event: any) => {
            const { scrollTop, scrollHeight, clientHeight } =
                event.target.scrollingElement;

            if (scrollTop !== 0 && scrollTop + clientHeight === scrollHeight) {
                getMorePeople();
            }
        };

        document.addEventListener('scroll', onScroll);

        return () => {
            document.removeEventListener('scroll', onScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center">
            <ul ref={ul} className="w-11/12 xs:w-96 md:w-[31rem] mb-20 md:mb-0">
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
