import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdSearch, MdClose } from 'react-icons/md';
import { usePeopleStore } from 'hooks';
import { ResponsiveIcon } from 'components';

export function SearchBar() {
    const { t } = useTranslation();
    const { limit, setLimit, pattern, setPattern, getPeople, searchPeople } =
        usePeopleStore();
    const [showReset, setShowReset] = useState(pattern !== '' ? true : false);

    useEffect(() => {
        setShowReset(pattern !== '');
    }, [pattern]);

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        searchPeople(pattern);
    };

    const handlePatternChange = (pattern: string) => {
        setPattern(pattern);
    };

    const handleReset = () => {
        setPattern('');
        getPeople(true);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="fixed w-10/12 sm:w-[25rem] z-40"
        >
            <div className="p-2 rounded-xl shadow-lg bg-base-300 border border-slate-600">
                <div className="absolute top-3.5 left-3.5 search-bar-size">
                    <ResponsiveIcon icon={MdSearch} />
                </div>

                <input
                    type="text"
                    placeholder={t('search-bar.placeholder')}
                    className="input input-md text-xl bg-slate-600 text-slate-900 w-full px-8 sm:px-14 sm:text-xl"
                    value={pattern}
                    onChange={(event) =>
                        handlePatternChange(event.target.value)
                    }
                />

                {showReset && (
                    <button
                        type="button"
                        className="btn btn-ghost btn-circle btn-xs sm:btn-sm absolute top-2 right-2 sm:top-3"
                        onClick={handleReset}
                    >
                        <div className="">
                            <ResponsiveIcon icon={MdClose} />
                        </div>
                    </button>
                )}

                <div className="flex items-center justify-between mx-1 mt-2">
                    <span className="text-slate-400 text-xl">Limit</span>

                    <div className="form-control ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-400 mr-1 text-xl">
                                100
                            </span>
                            <input
                                type="radio"
                                name="radio-6"
                                className="radio radio-xs sm:radio-md checked:bg-primary"
                                onChange={() => setLimit(100)}
                                defaultChecked={limit === 100}
                            />
                        </label>
                    </div>

                    <div className="form-control ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-400 mr-1 text-xl">
                                500
                            </span>
                            <input
                                type="radio"
                                name="radio-6"
                                className="radio radio-xs sm:radio-md checked:bg-primary"
                                onChange={() => setLimit(500)}
                                defaultChecked={limit === 500}
                            />
                        </label>
                    </div>

                    <div className="form-control ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-400 mr-1 text-xl">
                                All
                            </span>
                            <input
                                type="radio"
                                name="radio-6"
                                className="radio radio-xs sm:radio-md checked:bg-primary"
                                onChange={() => setLimit(-1)}
                                defaultChecked={limit === -1}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
}
