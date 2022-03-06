import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { Person } from 'models';
import { CardPerson, SearchBar } from 'components';

type Props = { people: Person[]; onSearch?: (pattern: string) => void };

export function PeopleList(props: Props) {
    const dummyCallback = () => true;
    const { people, onSearch = dummyCallback } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSelect = (id: string) => navigate(`/people/${id}`);

    return (
        <div className="flex flex-col items-center pt">
            {/* <h1 className="text-3xl sm:text-5xl p-1 sm:p-4">
                {t('people.list.title')}
            </h1> */}

            <SearchBar onSearch={onSearch} />

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
