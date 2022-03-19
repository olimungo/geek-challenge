import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdSearch, MdClose } from 'react-icons/md';
import { usePeopleStore } from 'hooks';
import { ResponsiveIcon } from 'components';

export function SearchBar() {
    const { t } = useTranslation();
    const { pattern, setPattern, getPeople, searchPeople } = usePeopleStore();
    const [showReset, setShowReset] = useState(pattern !== '' ? true : false);

    useEffect(() => {
        setShowReset(pattern !== '');
    }, [pattern]);

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();

        console.log(pattern);

        if (pattern !== '') {
            searchPeople(pattern);
        } else {
            getPeople(true);
        }
    };

    const handlePatternChange = (pattern: string) => {
        setPattern(pattern);
    };

    const handleReset = () => {
        setPattern('');
        getPeople(true);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-10/12 sm:w-[25rem]">
            <div className="absolute top-2.5 md:top-2 left-3 text-base-100">
                <ResponsiveIcon icon={MdSearch} />
            </div>

            <input
                type="text"
                placeholder={t('search-bar.placeholder')}
                className="text-xl rounded-full bg-slate-300 text-slate-900 w-full py-1 px-10 sm:px-10 sm:text-xl"
                value={pattern}
                onChange={(event) => handlePatternChange(event.target.value)}
            />

            {showReset && (
                <button
                    type="button"
                    className="btn btn-ghost btn-circle btn-xs sm:btn-sm absolute top-1.5 md:top-1 right-2"
                    onClick={handleReset}
                >
                    <div className="text-base-100">
                        <ResponsiveIcon icon={MdClose} />
                    </div>
                </button>
            )}
        </form>
    );
}
