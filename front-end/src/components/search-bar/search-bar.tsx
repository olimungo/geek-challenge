import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdSearch, MdClose } from 'react-icons/md';
import { usePeopleStore } from 'hooks';

export function SearchBar() {
    const { t } = useTranslation();
    const { limit, setLimit, pattern, setPattern, getPeople, searchPeople } =
        usePeopleStore();
    const [size, setSize] = useState(checkSize());
    const [showReset, setShowReset] = useState(pattern !== '' ? true : false);

    function checkSize() {
        if (window.innerWidth < 640) {
            return '1.3rem';
        } else {
            return '1.9rem';
        }
    }

    useEffect(() => {
        function resize() {
            setSize(checkSize());
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

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
        <form onSubmit={handleSearch} className="fixed z-50">
            <div className="p-[.2rem] sm:p-1 bg-slate-400 rounded-xl">
                <MdSearch
                    size={size}
                    className="absolute top-2.5 left-2 sm:top-3.5 sm:left-3.5 text-slate-400 search-bar-size"
                />

                <input
                    type="text"
                    placeholder={t('search-bar.placeholder')}
                    className="input input-sm sm:input w-72 sm:w-96 px-8 sm:px-14 sm:text-xl"
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
                        <MdClose size={size} className=" text-slate-400" />
                    </button>
                )}

                <div className="flex items-center justify-between mx-1">
                    <span className="text-slate-600 sm:text-lg">Limit</span>

                    <div className="form-control ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-600 mr-1 sm:mr-2 sm:text-lg">
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
                            <span className="label-text text-slate-600 mr-1 sm:mr-2 sm:text-lg">
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
                            <span className="label-text text-slate-600 mr-1 sm:mr-2 sm:text-lg">
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
